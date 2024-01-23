document.addEventListener("DOMContentLoaded", function () {
    var dropdownBtn = document.getElementById("dropdownBtn");
    var dropdownMenu = document.getElementById("dropdownMenu");

    dropdownBtn.addEventListener("click", function () {
        if (dropdownMenu.style.display === "block") {
            dropdownMenu.style.display = "none";
        } else {
            dropdownMenu.style.display = "block";
        }
    });

    // Close the dropdown when clicking outside of it
    document.addEventListener("click", function (event) {
        if (!event.target.matches('#dropdownBtn')) {
            if (dropdownMenu.style.display === "block") {
                dropdownMenu.style.display = "none";
            }
        }
    });
});
