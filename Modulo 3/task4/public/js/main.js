// Globals
const menu_header = document.getElementById('menu-header');
const menu_nav = document.getElementById('menu-nav');
const filter_menu = document.getElementById('filter');
const arrow_menu = document.getElementById('arrow')
const main = document.getElementById('main');
const game_one = document.getElementById('game-one');
const game_two = document.getElementById('game-two');
const match_one = document.getElementById('match-one');
const match_two = document.getElementById('match-two');
const menu_page = document.getElementById('menu-page');
const title = document.getElementById('title');
const maps = document.getElementsByTagName('iframe');
const main_menu = document.getElementById('main-menu');
const chat_container = document.getElementById('chat-cont');
const chat = document.getElementById('chat');
const match_one_chat = document.getElementById('filter-match-one');
const match_two_chat = document.getElementById('filter-match-two');

//hidden pages
match_one.style.display = 'none';
match_two.style.display = 'none';
arrow_menu.style.display = 'none';
main_menu.style.display = 'none';
chat_container.style.display = 'none';

//Events listeners
arrow_menu.addEventListener("click", ()=>{
    match_one.style.display = 'none'
    match_two.style.display = 'none'
    game_one.style.display = ''
    game_two.style.display = ''
    arrow_menu.style.display = 'none'
    filter_menu.style.display = ''
    title.style.display = ''
    main_menu.style.display = 'none'
    main.style.display = ''
    chat_container.style.display = 'none'
});

chat.addEventListener('click', ()=>{
    main_menu.style.display = 'none';
    chat_container.style.display = '';
    for(i=0;i<=filtermessage.length; i++){
        if(filtermessage[i]){
            filtermessage[i].parentNode.parentNode.style.display = 'block'
        }
    }
})

match_one_chat.addEventListener('click', ()=>{
    match_one.style.display = 'none';
    chat_container.style.display = '';
    for(i=0;i<=filtermessage.length; i++){
        if(filtermessage[i].innerHTML === "Game 1"){
            filtermessage[i].parentNode.parentNode.style.display = 'block'
        }else{
            filtermessage[i].parentNode.parentNode.style.display = 'none'
        }
    }
})

match_two_chat.addEventListener('click', ()=>{
    match_two.style.display = 'none';
    chat_container.style.display = '';
    for(i=0;i<=filtermessage.length; i++){
        if(filtermessage[i].innerHTML === "Game 2"){
            filtermessage[i].parentNode.parentNode.style.display = 'block'
        }else{
            filtermessage[i].parentNode.parentNode.style.display = 'none'
        }
    }
})
//Menu nav
menu_nav.addEventListener("click", ()=>{
    main.style.display = 'none';
    filter_menu.style.display = 'none';
    main_menu.style.display = '';
    arrow_menu.style.display = '';
    chat_container.style.display = 'none';
})

if (window.matchMedia("(orientation: portrait)").matches) {
    game_one.addEventListener("click", ()=>{
        match_one.style.display = ''
        filter_menu.style.display = 'none'
        arrow_menu.style.display = ''
        game_one.style.display = 'none'
        game_two.style.display = 'none'
        title.style.display = 'none'
    })
    
    game_two.addEventListener("click", ()=>{
        match_two.style.display = ''
        filter_menu.style.display = 'none'
        arrow_menu.style.display = ''
        game_one.style.display = 'none'
        game_two.style.display = 'none'
        title.style.display = 'none'
    })}

if (window.matchMedia("(orientation: landscape)").matches) {
    maps[0].setAttribute("height", "95vh");
    maps[1].setAttribute("height", "95vh");

    game_one.addEventListener("click", ()=>{
    match_two.style.display = 'none'
    match_one.style.display = ''
    })

    game_two.addEventListener("click", ()=>{
    match_one.style.display = 'none'
    match_two.style.display = ''
    })}

window.addEventListener("orientationchange", function() {
    location.reload()
}, false);