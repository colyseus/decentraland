export const uiCanvas = new UICanvas()

const leaderboardBackground = new UIContainerRect(uiCanvas);
leaderboardBackground.alignmentUsesSize = true;
leaderboardBackground.positionX = "-41%";
leaderboardBackground.positionY = "5%";
leaderboardBackground.width = 200;
leaderboardBackground.height = 200;
leaderboardBackground.color = Color4.Black();
leaderboardBackground.opacity = 0.5;

uiCanvas.positionX = 0;

let leaderboard: UIText = new UIText(uiCanvas);
leaderboard.positionX = "-41%";
leaderboard.positionY = "5%";
leaderboard.paddingLeft = 10;
leaderboard.fontSize = 15;
leaderboard.width = 200;
leaderboard.height = 210;
leaderboard.hTextAlign = "left";
leaderboard.vAlign = "center";
leaderboard.color = Color4.White();



export function updateLeaderboard(playerNames: string[]) {
    while (playerNames.length < 10) {
        playerNames.push("");
    }
    playerNames = playerNames.filter((_, i) => i < 10);
    leaderboard.value = `Leaderboard:\n\n${playerNames.join("\n")}`;
}