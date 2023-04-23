/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
export const toggle = () => {
  document.getElementById("myDropdown").classList.toggle("show");
};

// Close the dropdown menu if the user clicks outside of it

export const closeDropdown = () => {
  window.onclick = (event) => {
    if (!event.target.matches(".nav-dropbtn")) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
  };
};

// Chose a thumbnail

export const clickThumbnail = () => {
  document.querySelector('#thumbnail-input').click();
}

export const clickVideo = () => {
  document.querySelector('#video-input').click();
}