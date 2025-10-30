document.getElementById("sheetdb-form").addEventListener("submit", function(e) {
    e.preventDefault();
    var name = document.getElementById("name").value;
    var partnername = document.getElementById("partnername").value;
    var relationship = getFlamesRelationship(name, partnername);
    document.querySelector(".resultMsg").innerText = "Relationship: " + relationship;
});



function getFlamesRelationship(name, partnername) {
    // Convert names to lowercase and remove spaces
    name = name.toLowerCase().replace(/\s+/g, "");
    partnername = partnername.toLowerCase().replace(/\s+/g, "");

    // Find common characters
    var nameArr = name.split("");
    var partnerArr = partnername.split("");
    for (var i = 0; i < nameArr.length; i++) {
        var index = partnerArr.indexOf(nameArr[i]);
        if (index != -1) {
            nameArr[i] = null;
            partnerArr[index] = null;
        }
    }
    // Count remaining characters
    var count = 0;
    for (var i = 0; i < nameArr.length; i++) {
        if (nameArr[i] != null) count++;
    }
    for (var i = 0; i < partnerArr.length; i++) {
        if (partnerArr[i] != null) count++;
    }

    // FLAMES logic
    var flames = ['F', 'L', 'A', 'M', 'E', 'S'];
    while (flames.length > 1) {
        var removeIndex = (count % flames.length) - 1;
        if (removeIndex >= 0) {
            flames.splice(removeIndex, 1);
            flames = flames.slice(removeIndex).concat(flames.slice(0, removeIndex));
        } else {
            flames.pop();
        }
    }
    switch (flames[0]) {
        case 'F': return "Friend";
        case 'L': return "Love";
        case 'A': return "Affection";
        case 'M': return "Marriage";
        case 'E': return "Enemy";
        case 'S': return "Sister";
        default: return "Unknown";
    }
}
document.getElementById("sheetdb-form").addEventListener("submit", function(e) {
    e.preventDefault();
    var name = document.getElementById("name").value;
    var partnername = document.getElementById("partnername").value;
    var relationship = getFlamesRelationship(name, partnername);
    document.querySelector(".resultMsg").innerText = "Relationship: " + relationship;

    // SEND DATA TO SHEETDB API
    fetch("https://sheetdb.io/api/v1/ud74zchn36749", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            data: {
                Name: name,
                PartnerName: partnername,
                Result: relationship 
            }
        })
    })
    .then(response => response.json())
    .then(data => {
        // Optionally handle success
        console.log("SheetDB Response:", data);
    })
    .catch(error => {
        // Optionally handle error
        console.error("SheetDB Error:", error);
    });
});
