document.addEventListener("DOMContentLoaded", function () {
    const memeBtn = document.getElementById("getMemeBtn");
    const memeImage = document.getElementById("memeImage");
    const downloadBtn = document.getElementById("downloadMeme");

    async function getMeme() {
        try {
            const response = await fetch("https://api.imgflip.com/get_memes");
            const data = await response.json();

            if (data.success) {
                const memes = data.data.memes;
                const randomMeme = memes[Math.floor(Math.random() * memes.length)];

                memeImage.src = randomMeme.url;
                memeImage.alt = randomMeme.name;

                downloadBtn.style.display = "block"; // Show the download button
            } else {
                console.error("Failed to fetch memes.");
            }
        } catch (error) {
            console.error("Error fetching meme:", error);
        }
    }

    memeBtn.addEventListener("click", getMeme);

    // Download Meme
    downloadBtn.addEventListener("click", function () {
        const link = document.createElement("a");
        link.href = memeImage.src;
        link.download = "meme.jpg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});

