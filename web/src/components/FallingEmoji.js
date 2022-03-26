export class FallingEmojis extends React.Component {

    constructor(props) {
        super(props);
        this.animations = [
            styles.emojiAnimation0,
            styles.emojiAnimation1,
            styles.emojiAnimation2,
            styles.emojiAnimation3,
            styles.emojiAnimation4
        ]

        this.emojiArray = [emoji, emoji, emoji, emoji, emoji];
        this.order = [0, 3, 1, 2, 4];


    }

    render() {
        return (
            <div className={styles.FallingEmojis}>
                {emojiArray.map((emojiElement, i) => {
                return <span key={i} className={[styles.emoji, animations[order[i]]].join(' ')}>{emojiElement}</span>;
            })})
    }

}