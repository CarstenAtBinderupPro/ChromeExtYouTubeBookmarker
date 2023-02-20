document.addEventListener('DOMContentLoaded', async() =>{
    const linksList = document.getElementById('linksList')
    const url = 'https://jqq-utils.netlify.app/api/recentYTVideos'

    const copy = (e) => {
        const str = e.target.dataset.url
        alert(str)
        navigator.clipboard.readText(str)
    }

    try {
        const res = await fetch(url)
        const videos = await res.json()
        const videoHTML = videos.map(video => {
            const videoUrl = `https://www.youtube.com/watch?v=${video.videoId}`
            return `<li class="video-link">
                <button class="btn" data-url="${videoUrl}">Copy URL</button>
                <a class="btn" href="${videoUrl}" rel="noopener noreferrer" target="_blank">Watch</a>
                ${video.title}
                </li>
                `
        }).join('')
        linksList.innerHTML = videoHTML
        const videoLinks = [...document.querySelectorAll('.video-link')]
        videoLinks.forEach(link => link.addEventListener('click', copy()))
    }
    catch (err){
        console.log(err)
    }
})