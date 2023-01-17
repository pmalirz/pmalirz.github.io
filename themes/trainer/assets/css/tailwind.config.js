/** @typedef {import("tailwind-types")} */
module.exports = {
    content: {
        files: [
            "./themes/**/layouts/**/*.html",
            "./content/**/layouts/**/*.html",
            "./layouts/**/*.html",
            "./content/**/*.html",
        ]
    },
    theme: {
        minHeight: ({ theme }) => theme('spacing')
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/line-clamp'),
    ],
/*    safelist: [
        {
            // pattern: /bg-.*!/,
            // variants: ['lg', 'hover', 'focus', 'lg:hover'],
        },
    ]*/

}
