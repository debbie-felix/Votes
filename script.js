
let totalVotes = 30000; 
const totalVotesBox = document.getElementById('totalVote');
const voteCards = document.querySelectorAll('.vote-card');
const progressBar = document.querySelector('.progress-bar .filled');

const votingSection = document.querySelector('.voting-section');
const leaderboardSection = document.querySelector('.leaderboard-section');
const viewLeaderboardBtn = document.querySelector('.leaderboard-btn');
const backToVoteBtn = document.querySelector('.back-to-vote-btn');
const submitVotesBtn = document.querySelector('.finishVotes-btn');
const evictionText = document.querySelector('.evicted-text .housemate');

function updateProgressBar() {
    const usedVotes = 30000 - totalVotes;
    const percentage = (usedVotes / 30000) * 100;
    progressBar.style.width = `${percentage}%`;
}

function handleVoteChange(cards, change, index) {
    const currentCard = cards[index];
    const voteDisplay = currentCard.querySelector('span');
    let currentVotes = parseInt(voteDisplay.textContent);
    const newVotes = currentVotes + change;

    if (newVotes >= 0 && (totalVotes - change) >= 0) {
        voteDisplay.textContent = newVotes;
        totalVotes -= change;
        totalVotesBox.textContent = totalVotes.toLocaleString();

        const excessVoteWarning = currentCard.querySelector('.excess-vote');
        if (totalVotes <= 0) {
            excessVoteWarning.style.display = 'block';
        } else {
            excessVoteWarning.style.display = 'none';
        }

        updateProgressBar();
    }
}

function updateLeaderboard() {
    // const voteCounts = Array.from(document.querySelectorAll('.vote-card span')).map(span => parseInt(span.textContent));
    const voteCounts = [];
    document.querySelectorAll('.vote-card span').forEach(span => {
        voteCounts.push(parseInt(span.textContent));
    });
const leaderboardRanks = document.querySelectorAll('.leaderboard-card .rank');
    const leaderboardNames = document.querySelectorAll('.leaderboard-card #name');

    voteCounts.forEach((count, index) => {
        leaderboardRanks[index].textContent = count;
    });

    const minVotes = Math.min(...voteCounts);
    const evictedIndex = voteCounts.indexOf(minVotes);
    const evictedHousemate = leaderboardNames[evictedIndex].textContent;

    evictionText.textContent = evictedHousemate;
}

voteCards.forEach((card, index) => {
    const sub = card.querySelector('.vote-controls button:first-child');
    const add = card.querySelector('.vote-controls button:last-child');

    sub.addEventListener('click', function () {
        handleVoteChange(voteCards, -3000, index);
    });

    add.addEventListener('click', function () {
        handleVoteChange(voteCards, 3000, index);
    });
});

submitVotesBtn.addEventListener('click', function () {
    updateLeaderboard();
     alert('Thanks for Voting 😎')
});

viewLeaderboardBtn.addEventListener('click', function () {
    votingSection.style.display = 'none';
    leaderboardSection.style.display = 'block';
});

backToVoteBtn.addEventListener('click', function () {
    leaderboardSection.style.display = 'none';
    votingSection.style.display = 'block';
});

updateProgressBar();
