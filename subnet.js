function calc() {
    var re_ip_field = new RegExp("^[0-9]{1,3}");
    var re_mask_length = new RegExp("^[0-9]{1,2}");
    var ip_0 = document.getElementById('0').value;
    var ip_1 = document.getElementById('1').value;
    var ip_2 = document.getElementById('2').value;
    var ip_3 = document.getElementById('3').value;
    var mask_length = document.getElementById('4').value;
    var ip_array = [parseInt(re_ip_field.exec(ip_0)), parseInt(re_ip_field.exec(ip_1)), parseInt(re_ip_field.exec(ip_2)), parseInt(re_ip_field.exec(ip_3))]; 
    mask_length = parseInt(mask_length);

    if (mask_length > 32) {
        alert("Invalid mask length");
        return;
    }

    var mask = ((0xffffffff << (32 - mask_length)) >>> 0);
    var ip_address = 0;
    for (i = 0; i <= 3; i++) {
        if (ip_array[i] > 255) {
            alert("Invalid format");
            return;
        }
        ip_address = ((ip_address << 8) | ip_array[i]) >>> 0;
    }

    var network_id = (mask & ip_address) >>> 0;
    var network_id_string = ""
    for (i = 0; i <= 3; i++) {
        if (i == 0) {
            network_id_string = ((network_id & 0xff) >>> 0).toString() + network_id_string;
        } else {
            network_id_string = ((network_id & 0xff) >>> 0).toString() + "." + network_id_string;
        }
        network_id = network_id >> 8;
    }

    document.getElementById("network_id").innerHTML = "Network ID: " + network_id_string;

    var broadcast = (ip_address | (~mask)) >>> 0;
    var broadcast_string = "";
    for (i = 0; i < 4; i++) {
        if (i == 0) {
            broadcast_string = ((broadcast & 0xff) >>> 0).toString() + broadcast_string;
        } else {
            broadcast_string = ((broadcast & 0xff) >>> 0).toString() + "." + broadcast_string;
        }
        broadcast = broadcast >> 8;
   }

   document.getElementById("broadcast_address").innerHTML = "Broadcast Address: " + broadcast_string;
}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    } else {
        return true;
    }
}
