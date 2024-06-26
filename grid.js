class grid {
    constructor(game){
        this.game = game;
        this.width = this.game.ctx.canvas.width;
        this.height = window.innerHeight;

        this.EntityStructure = [this.width/64][this.height/64]; //defines grid based on dimensions

        
        game.addEntity(new letter(game, this.width/128, 0, this.EntityStructure, "a"));
        game.addEntity(new wall(game, 2, 18, this.EntityStructure, 'left'));
        game.addEntity(new wall(game, 3, 18, this.EntityStructure, 'left'));
        game.addEntity(new wall(game, 4, 18, this.EntityStructure, 'left'));
        game.addEntity(new wall(game, 5, 18, this.EntityStructure,'left'));
        game.addEntity(new wall(game, 6, 18, this.EntityStructure,'left'));
        game.addEntity(new wall(game, 7, 18, this.EntityStructure, 'left'));

        console.log("added entities!!");

    };


    update(){
        if(this.game.escape){
            this.game.escape = false;
            this.game.reset();
        }
        
        if(this.game.player == 'dead'){
            let newLetter = new letter(this.game, this.width/128, 0, "a");
            this.game.addEntity(newLetter);
            console.log("eoeoeo");
        }
    };

    draw(ctx){
        
    };
};