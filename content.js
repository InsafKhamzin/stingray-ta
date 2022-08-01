const ToolRay = 'FavoriteToolbarLineToolRay'
const ToolHorzRay = 'FavoriteToolbarLineToolHorzRay'

let rayClicked = false
let horzRayClicked = false

//hotkeys listener 
window.addEventListener('keypress', (key) => {
    if (key.ctrlKey !== true || key.repeat) { return }

    switch (key.code) {
        case 'KeyA':
            switchTf(true)
            break
        case 'KeyD':
            switchTf(false)
            break
        case 'KeyW':
            pickFavTool(ToolRay)
            break
        case 'KeyS':
            pickFavTool(ToolHorzRay)
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
    const tool = document.querySelectorAll(`[data-name="${toolName}"]`)
    tool[0].click()
}

const chartUi = document.getElementsByClassName('layout__area--center')[0]

//mouse click listener
chartUi.addEventListener('mousedown', function (event) {

    if (rayClicked === false && horzRayClicked === false){
        return
    }

    const templates = document.querySelectorAll(`[data-name="templates"]`)[0]

    if (!templates) {
        return
    }
    templates.click()

    const templatesSelect = document.getElementById('overlap-manager-root')
    if (templatesSelect.childNodes.length === 0) {
        return
    }
    const intervalHeader = document.getElementById('header-toolbar-intervals')
    const activeTf = Object.values(intervalHeader.childNodes).filter(tf => tf.className.includes('isActive'))[0]
    const activeTfValue = mapTf(activeTf.getAttribute('data-value'));
    if (activeTfValue === '') {
        return
    }

    // TODO remove timeout
    setTimeout(() => {
        const templatesTfs = templatesSelect.getElementsByClassName('label-tPYeYcJa')
        Object.values(templatesTfs).forEach(tf => {
            if (tf.innerHTML === activeTfValue) {
                tf.click()
                rayClicked = false
                horzRayClicked = false
            }
        })
    }, 0);

})

function mapTf(tf) {
    switch (tf) {
        case '1':
            return '1m'
        case '3':
            return '3m'
        case '5':
            return '5m'
        case '15':
            return '15m'
        case '60':
            return '1h'
        case '240':
            return '4h'
        case '1D':
            return 'D'
        case '1W':
            return 'W'
        case '1M':
            return 'M'
        default:
            return ''
    }
}

waitForElementToLoad(`[data-name="${ToolRay}"]`).then((elm) => {
    elm.addEventListener('click', function (e) {
        rayClicked = true
    })
});

waitForElementToLoad(`[data-name="${ToolHorzRay}"]`).then((elm) => {
    elm.addEventListener('click', function (e) {
        horzRayClicked = true
    })
});


//helper function for observing element to appear in DOM
function waitForElementToLoad(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver((mutations) => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}
