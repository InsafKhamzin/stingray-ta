//hotkeys listener 
window.addEventListener('keypress', function (key) {
    if (key.ctrlKey !== true || key.repeat) { return }

    switch (key.code) {
        case 'KeyA':
            switchTf(true)
            break
        case 'KeyD':
            switchTf(false)
            break
        case 'KeyW':
            pickFavTool('FavoriteToolbarLineToolRay')
            break
        case 'KeyS':
            pickFavTool('FavoriteToolbarLineToolHorzRay')
            break
    }
})

//changes timeframes
function switchTf(left) {
    const intervalHeader = document.getElementById('header-toolbar-intervals')
    if (!intervalHeader) {
        return
    }

    const timeframes = intervalHeader.childNodes
    if (timeframes.childNodes === 0) {
        return
    }

    for (let i = 0; i < timeframes.length - 1; i++) {
        const tfClassName = timeframes[i].className
        if (!tfClassName.includes('isActive')) {
            continue
        }
        newTfIdx = left ? i - 1 : i + 1
        if (newTfIdx >= 0 && newTfIdx < timeframes.length - 1) {
            timeframes[newTfIdx].click()
        }
        break
    }
}

function pickFavTool(toolName) {
    const tool = document.querySelectorAll(`[data-name="${toolName}"]`);
    tool[0].click()
}