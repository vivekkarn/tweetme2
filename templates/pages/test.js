function LikeBtn(tweet) {
    return (
        `<button class = 'btn btn-primary btn-sm' onclick = handleDidLike(${tweet.id},${tweet.likes},'like')>${tweet.likes} Like </button>`
    );
}