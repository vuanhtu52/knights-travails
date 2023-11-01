const Node = (x, y) => {
    let _x = x;
    let _y = y;
    let _parent = null;

    const getX = () => {
        return _x;
    };
    
    const getY = () => {
        return _y;
    };

    const setParent = node => {
        _parent = node;
    };

    const getParent = () => {
        return _parent;
    }

    return {
        getX,
        getY,
        setParent,
        getParent,
    };
}

const Knight  = () => {
    const knightMoves = (startNode, endNode) => {
        // Check if the start and end nodes are in valid range
        for (let val of [startNode.getX(), startNode.getY(), endNode.getX(), endNode.getY()]) {
            if (val < 0 || val > 7) {
                return null;
            }
        }

        let queue = [startNode]; // Keep track of which node to visit next
        let visited = []; // Keep track of the visited nodes, each node is stored as "x-y"

        while (queue.length > 0) {
            // Mark the current node as visited
            visited.push(`${queue[0].getX()}-${queue[0].getY()}`);

            // If the current node matches the endNode, break the loop
            if (queue[0].getX() === endNode.getX() && queue[0].getY() === endNode.getY()) {
                break;
            }
            // Get the next moves and set their parents to current node
            let nextMoves = getNextMoves(queue[0]);
            nextMoves.forEach(node => {
                node.setParent(queue[0]);
            });

            // Enqueue the next unvisited moves
            for (let node of nextMoves) {
                if (!visited.includes(`${node.getX()}-${node.getY}`)) {
                    queue.push(node);
                }
            }

            // Dequeue the current node
            queue.shift();
        }

        // Backtrack to get the parent nodes
        let result = [queue[0]];
        let currentNode = queue[0];
        while (currentNode.getParent() !== null) {
            currentNode = currentNode.getParent();
            result.push(currentNode);
        }
        result.reverse();

        return result;
    };

    const getNextMoves = node => {
        let result = [];
        let deltas = [[-1, 2], [1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1]];
        for (let [deltaX, deltaY] of deltas) {
            const nextX = node.getX() + deltaX;
            const nextY = node.getY() + deltaY;
            if (nextX >= 0 && nextX <= 7 && nextY >= 0 && nextY <= 7) {
                result.push(Node(nextX, nextY));
            }
        }
        return result;
    };

    return {
        knightMoves,
        getNextMoves,
    }
};

const knight = Knight();

const moves = knight.knightMoves(Node(0, 0), Node(1, 2));
for (let node of moves) {
    console.log(node.getX(), node.getY());
}
