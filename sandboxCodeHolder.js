let headTile = tile;
        tile.style.backgroundColor = "yellow";
        let isSpace = true;
        let tailTile = tile;
        for(let i = 0; i < carrier.length-1; i++){
            if(tailTile.nextSibling != null){
            tailTile = tailTile.nextSibling;
            isSpace = true;
            } else {
                isSpace = false;
                break;
            }
        }
        if(isSpace){
        for(let i = 1; i < carrier.length; i++){
            if(tile.nextSibling){
                let next = tile.nextSibling.getAttribute("y");
                let curr = tile.getAttribute("y");
                if(next == curr && headTile.getAttribute("y") == curr){
                    tile.nextSibling.style.backgroundColor = "yellow";
                    tile = tile.nextSibling;
                    curr = tile.getAttribute("y");
                    next = tile.nextSibling.getAttribute("y");
                } else {
                //tile.nextSibling.style.backgroundColor = "red";
                tile = tile.nextSibling;
                curr = tile.getAttribute("y");
                next = tile.nextSibling.getAttribute("y");
                }   
            }
        }
        } else {
            while(tile.nextSibling){
                tile.style.backgroundColor = "yellow";
                tile = tile.nextSibling;
        
            }
        }