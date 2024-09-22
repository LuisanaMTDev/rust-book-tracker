// 1. Loop to render various lesson cards
const amountOfLessonsToPrerender = 10
const originalLessonCard = document.querySelector('#original')
const section = document.querySelector('section')
for (let e = 1; e <= amountOfLessonsToPrerender; e++) {
    const lessonCard = originalLessonCard.cloneNode(true)
    lessonCard.removeAttribute('id')
    lessonCard.classList.add('lesson-card')
    section.append(lessonCard)
    console.debug(`Element ${e} added`)
}
// 2. Function to modify all the lesson cards
/* const LESSON_STATES = {
    WITHOUT_START: 0,
    WITHOUT_FINISH: 1,
    DONE: 2,
} */


const lessons = JSON.parse(window.localStorage.getItem('lessons'))
if (!lessons) {
    fetch('./rust-book.json')
        .then((response) => response.json())
        .then((json) => {
            console.debug(typeof json)
            main(json)
        }).catch((reason) => console.error(reason))
} else { main(lessons) }

/**
 * @param {array} lessons - All the lessons from comprehensive rust page.
 * @returns {number} returns 0 if all finished correctly or 1 otherwise
*/
function main(lessons) {
    const prerenderedLessons = section.querySelectorAll('.lesson-card')
    for (const prerenderedLesson of prerenderedLessons) {
        section.removeChild(prerenderedLesson)
    }

    lessons.forEach((lesson) => {
        const lessonCard = originalLessonCard.cloneNode(true)
        lessonCard.removeAttribute('id')
        lessonCard.classList.add('lesson-card')
        const lessonCardSvgElement = lessonCard.querySelector('svg')
        lessonCardSvgElement.classList.remove('state-0')
        lessonCardSvgElement.classList.add(`state-${lesson.state}`)
        const lessonCardText = lessonCard.querySelector('strong')
        lessonCardText.innerText = lesson.title
        const lessonCardSelectElement = lessonCard.querySelector('select')
        lessonCardSelectElement.value = lesson.state
        section.append(lessonCard)
        console.log(lesson)
    })
    section.removeChild(originalLessonCard)
    window.localStorage.setItem('lessons', JSON.stringify(lessons))
    // Add event lisener to the select element of lesson cards.
    const lessonsInStorage = JSON.parse(window.localStorage.getItem('lessons'))
    const lessonCards = section.querySelectorAll('.lesson-card')
    lessonCards.forEach((lessonCard) => {
        const lessonCardSelectElement = lessonCard.querySelector('select')
        lessonCardSelectElement.addEventListener('change', (event) => {
            const lessonCardSvgElement = lessonCard.querySelector('svg')
            lessonCardSvgElement.classList.remove('state-0', 'state-1', 'state-2')
            lessonCardSvgElement.classList.add(`state-${event.target.value}`)

            // Add code to modify the object in localStorage and rewrite
            const lessonCardText = lessonCard.querySelector('strong')
            lessonsInStorage.forEach((lesson) => {
                if (lessonCardText.innerText == lesson.title) {
                    lesson.state = Number(event.target.value)
                }
            })
            console.log("End of for-loop #2")
            window.localStorage.setItem('lessons', JSON.stringify(lessonsInStorage))
            console.log(JSON.parse(window.localStorage.getItem('lessons')))
        })
        console.log("End of event hadler")
    })
    console.log("End of for-loop #1")
    console.log(JSON.parse(window.localStorage.getItem('lessons')))
}
