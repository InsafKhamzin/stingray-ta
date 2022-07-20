//hotkeys listener for changing timeframes
window.addEventListener('keypress', function (key) {
    if (key.repeat) { return }

    if (key.ctrlKey === true && key.code === 'KeyA') {
        switchTf(true)
    }
    if (key.ctrlKey === true && key.code === 'KeyD') {
        switchTf(false)
    }

})

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