class Todo{
    constructor(text,time_created,done)
    {
        this.text=text;
        this.time_created=time_created;
        this.done=done;
    }
    getTodotext(){
        return this.text;
    }
    setTodotext(text){
        this.text=text;        
    }
    getTimecreated(){
        return this.time_created;
    }
    setTimecreated(time){
        this.time_created=time;        
    }
    getDone(){
        return this.done;
    }
    setDone(done){
        this.done=done;

    }
}