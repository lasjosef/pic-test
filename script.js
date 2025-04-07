// app.js

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let galleryData = {};  // Object to store month-wise picture data

// Function to populate the month list on the left sidebar
function populateMonthList() {
    const monthList = document.getElementById('month-list');
    months.forEach((month, index) => {
        const li = document.createElement('li');
        li.textContent = `${month}`;
        li.onclick = () => showGalleryForMonth(index);
        monthList.appendChild(li);
    });
}

// Function to show gallery for a specific month
function showGalleryForMonth(monthIndex) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = "";  // Clear previous gallery

    const monthKey = `${months[monthIndex]}-${new Date().getFullYear()}`;

    if (galleryData[monthKey]) {
        const [user1Image, user2Image] = galleryData[monthKey];

        const item1 = document.createElement('div');
        item1.classList.add('gallery-item');
        item1.innerHTML = `<img src="${user1Image}" alt="User 1 Picture">`;

        const item2 = document.createElement('div');
        item2.classList.add('gallery-item');
        item2.innerHTML = `<img src="${user2Image}" alt="User 2 Picture">`;

        gallery.appendChild(item1);
        gallery.appendChild(item2);
    }
}

// Function to handle picture uploads
function uploadPicture(userIndex, monthIndex) {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    
    fileInput.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            const monthKey = `${months[monthIndex]}-${new Date().getFullYear()}`;

            if (!galleryData[monthKey]) {
                galleryData[monthKey] = [];
            }

            galleryData[monthKey][userIndex] = reader.result;

            alert("Picture uploaded successfully!");
            showGalleryForMonth(monthIndex);
        };

        reader.readAsDataURL(file);
    };

    fileInput.click();
}

// Initial setup
populateMonthList();

// Example buttons to upload pictures for each user
document.querySelector("body").insertAdjacentHTML('beforeend', `
    <div style="margin: 20px;">
        <button onclick="uploadPicture(0, 0)">Upload User 1 Picture for January</button>
        <button onclick="uploadPicture(1, 0)">Upload User 2 Picture for January</button>
    </div>
`);
