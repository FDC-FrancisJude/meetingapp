let form = document.getElementById('lobby__form')

let displayName = sessionStorage.getItem('display_name')
if(displayName){
    form.name.value = displayName
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const goTo = document.getElementById('go_to');
    goTo.disabled = true;
    goTo.textContent = 'Joining...';

    sessionStorage.setItem('display_name', e.target.name.value)
   
    const file = avatar.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const imageData = event.target.result.split(',')[1];

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://api.imgur.com/3/image', true);
        xhr.setRequestHeader('Authorization', 'Client-ID 546c25a59c58ad7');
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                if (response && response.data && response.data.link) {
                    const imgurLink = response.data.link;

                    sessionStorage.setItem('avatar', imgurLink)

                    let inviteCode = e.target.room.value
                    if(!inviteCode){
                        inviteCode = String(Math.floor(Math.random() * 10000))
                    }
                    window.location = `index.html?room=${inviteCode}`
                } else {
                    alert('Failed to upload image to Imgur');
                }
            }
        };

        xhr.send(JSON.stringify({ image: imageData }));
    };

    reader.readAsDataURL(file);

    
})

function previewImage(input) {
    const imagePreview = document.getElementById('image-preview');
    const file = input.files[0];

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
