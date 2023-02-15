import Alpine from 'alpinejs'

let isEnPath = window.location.pathname.startsWith('/en')

let translationSwitcher = function () {
    return {
        visibleFlag: isEnPath ? 'pl' : 'gb',
        countries: [
            {
                label: 'English',
                lang: 'en',
                flag: 'gb',
            },
            {
                label: 'Polski',
                lang: 'pl',
                flag: 'pl',
            },
        ],
        switchLang: () => {
            if (isEnPath) {
                window.location = window.location.pathname.replace('/en', '')
            } else {
                window.location = '/en/' + window.location.pathname
            }
        },
    }
}

Alpine.data('switcher', translationSwitcher)
Alpine.start()

