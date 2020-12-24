class hierarchicalJson {
    constructor() {
        this.date = {
            name: "Begin",
            children: []
        }
        this.levels = this.generateLevels();
        this.paths = []
        this.objs = []
        this.sizeObj = 0
        this.sizeLevel = 1
    }

    generateLevels() {
        let levels = []
        for (let i = 0; i < 16; i++) {
            levels.push(`level${i}`)
        }
        return levels;
    }

    pushPath(str) {
        this.paths.push(str);
    }

    creteDataObj() {
        let size = this.paths.length;

        for (let i = 0; i < size; i++) {
            let arrayPaths = this.paths[i].split('/');
            arrayPaths.forEach((path, index) => {
                if (this.objs.length) {
                    this.objs[this.sizeObj][`${this.levels[this.sizeLevel]}`] = path
                    this.sizeLevel++
                } else {
                    this.objs.push(this.objFactory(path))
                }
            })
            this.sizeObj++;
        }
    }

    createHierarchicalJson() {
        console.log(this.objs)
        let sizelevels = this.levels.length;
        this.objs.forEach((d) => {
            let depthCursor = this.date.children

            this.levels.forEach(function(property, depth) {

                let index

                depthCursor.forEach((child, i) => {
                    if (d[property] == child.name)
                        index = i;
                });

                if (isNaN(index)) {
                    let newString = new String(d[property])


                    if (newString.indexOf('.java') != -1) {
                        depthCursor.push({
                            name: d[property],
                            value: 190
                        });
                    } else {

                        depthCursor.push({
                            name: d[property],
                            children: []
                        });
                    }

                    index = depthCursor.length - 1;
                }
                depthCursor = depthCursor[index].children;
                if (depth === sizelevels - 1) {
                    try {
                        depthCursor.push({
                            name: d.name
                        });
                    } catch (error) {
                        console.log(error)
                    }

                }
            })
        })
    }

    objFactory(path) {
        return {
            level1: path
        }
    }

}