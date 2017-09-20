const Node = require('./node');

class LinkedList {
    constructor() {
        this.length = 0;
        this._head = null;
        this._tail = null;
    }

    append(data) {
        if(this.length === 0){
            this._head = new Node(data, null, null);
            this._tail = this._head;
        }else{
            let current = this._head;
            while(current.next){
                current = current.next;
            }
            let node = new Node(data, current, null);
            current.next = node;
            this._tail = node;
        }

        ++this.length;

        return this;
    }

    head() {
        return this._head === null ? null : this._head.data;
    }

    tail() {
        return this._tail === null ? null : this._tail.data;
    }

    at(index) {
        if(this.isEmpty() || index > this.length - 1) return undefined;

        let current = this._head;

        while(current.next && index > 0){
            current = current.next;
            --index;
        }
        
        return current.data;
    }

    insertAt(index, data) {
        if(this.at(index) !== undefined){
            let current = this._head;

            while(current.next && index > 0){
                current = current.next;
                --index;
            }
            current.data = data;
        }else{
            this.append(data);
        }

        return this;
    }

    isEmpty() {
        return this.length === 0;
    }

    clear() {
        this._head = null;
        this._tail = null;
        this.length = 0;

        return this;
    }

    deleteAt(index) {
        if(this.length > 0){
            let current = this._head;

            while(current.next && index > 0){
                current = current.next;
                --index;
            }
            if(current.next){
                current.next.prev = current.prev;
                current.prev.next = current.next;
            }else{
                if(current.prev){
                    current.prev.next = null;
                    this._tail = current.prev;
                }else{
                    this._head = null;
                    this._tail = null;
                }
            }
            --this.length;
        }

        return this;
    }
    
    reverse() {
        if(this.length > 1){
            let middle = this.length / 2;
            let forward = this._head;
            let backward = this._tail;

            for(let i = 0; i < middle; i++){
                //swap data 
                let temp = forward.data;
                forward.data = backward.data;
                backward.data = temp;

                forward = forward.next;
                backward = backward.prev;
            }
        }

        return this;
    }

    indexOf(data) {
        if(this.length > 0){
            let current = this._head;
            let position = 0;

            while(current.next && current.data !== data){
                current = current.next;
                ++position;
            }

            if(current.data === data)
                return position;

            return -1;
        }else{
            return -1;
        }
    }
}

module.exports = LinkedList;
