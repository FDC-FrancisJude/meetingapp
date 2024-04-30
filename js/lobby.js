let form = document.getElementById('lobby__form')

let displayName = sessionStorage.getItem('display_name')
if(displayName){
    form.name.value = displayName
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const file = avatar.files[0];

    if (file.size > 8000) {
        alert('File size exceeds the limit of 8kb. Please upload a smaller file.');
        return;
    }

    sessionStorage.setItem('display_name', e.target.name.value)
    uploadFile()
    let inviteCode = e.target.room.value
    if(!inviteCode){
        inviteCode = String(Math.floor(Math.random() * 10000))
    }
    window.location = `index.html?room=${inviteCode}`
})

function previewImage(input) {
    const imagePreview = document.getElementById('image-preview');
    const file = input.files[0];
    console.log(file);
    sessionStorage.setItem('display_avatar', file.name);
    imagePreview.innerHTML = '';

    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const image = document.createElement('img');
            image.setAttribute('src', e.target.result);
            image.setAttribute('alt', 'Avatar Preview');
            image.setAttribute('style', 'max-width: 200px; max-height: 200px;');
            imagePreview.appendChild(image);
        }

        reader.readAsDataURL(input.files[0]);
    } else {
        imagePreview.innerHTML = 'No image selected';
    }
}

function uploadFile() {
    const fileInput = document.getElementById('avatar');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function(event) {
            const imageData = event.target.result;

            // Save image data to local storage
            sessionStorage.setItem('avatar', imageData);
            console.log('File uploaded successfully');
        };

        reader.onerror = function(event) {
            console.error('Error reading file:', event.target.error);
        };

        reader.readAsDataURL(file);
    } else {
        console.error('No file selected');
    }
}