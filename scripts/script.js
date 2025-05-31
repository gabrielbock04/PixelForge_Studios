document.addEventListener('DOMContentLoaded', function () {
    // --- MENU HAMBURGER ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navList = document.getElementById('nav-list');
    if (hamburgerBtn && navList) {
        hamburgerBtn.addEventListener('click', () => {
            navList.classList.toggle('active');
        });
    }

    // --- FILTRO DE JOGOS ---
    const filtros = document.querySelectorAll('#filtros-categorias .list');
    const jogos = document.querySelectorAll('.game-item');
    const btnVerMais = document.getElementById('ver-mais-jogos');
    let mostrandoTodos = false;
    let categoriaAtual = 'todos';

    function filtrar(categoria) {
        let count = 0;
        jogos.forEach(jogo => {
            const cat = jogo.getAttribute('data-categoria');
            if (categoria === 'todos' || cat === categoria) {
                if (count < 3 || mostrandoTodos) {
                    jogo.style.display = '';
                } else {
                    jogo.style.display = 'none';
                }
                count++;
            } else {
                jogo.style.display = 'none';
            }
        });
        if (btnVerMais) {
            btnVerMais.style.display = (count > 3 && !mostrandoTodos) ? 'block' : 'none';
        }
    }

    filtros.forEach(filtro => {
        filtro.addEventListener('click', function () {
            filtros.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            categoriaAtual = this.getAttribute('data-categoria');
            mostrandoTodos = false;
            filtrar(categoriaAtual);
        });
    });

    if (btnVerMais) {
        btnVerMais.addEventListener('click', function () {
            mostrandoTodos = true;
            filtrar(categoriaAtual);
            btnVerMais.style.display = 'none';
        });
    }

    filtrar('todos');

    // --- TRAILERS EM DESTAQUE ---
    const trailers = [
        "https://www.youtube.com/embed/I65a4O5U_5k",
        "https://www.youtube.com/embed/5kcdRBHM7kM",
        "https://www.youtube.com/embed/zw47_q9wbBE?si=d6ThzFh1TG7gZXFJ",
        "https://www.youtube.com/embed/hvoD7ehZPcM?si=T2Oq4d0XOvWPdog5"
    ];
    let trailerAtual = 0;

    function atualizarTrailer() {
        const iframe = document.getElementById('trailer-video');
        if (iframe) iframe.src = trailers[trailerAtual];
    }

    const btnProximo = document.getElementById('btn-proximo-trailer');
    if (btnProximo) {
        btnProximo.onclick = function () {
            trailerAtual = (trailerAtual + 1) % trailers.length;
            atualizarTrailer();
        };
    }
    const setaEsq = document.querySelector('.trailer-arrow.left');
    const setaDir = document.querySelector('.trailer-arrow.right');
    if (setaEsq) {
        setaEsq.onclick = function () {
            trailerAtual = (trailerAtual - 1 + trailers.length) % trailers.length;
            atualizarTrailer();
        };
    }
    if (setaDir) {
        setaDir.onclick = function () {
            trailerAtual = (trailerAtual + 1) % trailers.length;
            atualizarTrailer();
        };
    }

    // --- FORMULÁRIO DE CONTATO ---
    const form = document.querySelector('.form form');
    if (form) {
        form.addEventListener('submit', function (e) {
            // Remove mensagens antigas
            form.querySelectorAll('.erro-form').forEach(el => el.remove());

            // Seleciona os campos
            const nome = form.querySelector('input[placeholder="Digite seu nome"]');
            const email = form.querySelector('input[placeholder="Digite seu Email"]');
            const mensagem = form.querySelector('textarea');

            let valido = true;

            if (!nome.value.trim()) {
                mostrarErro(nome, 'Digite seu nome.');
                valido = false;
            }
            if (!email.value.trim() || !/^[\w\.-]+@[\w\.-]+\.\w{2,}$/.test(email.value)) {
                mostrarErro(email, 'Digite um e-mail válido.');
                valido = false;
            }
            if (!mensagem.value.trim()) {
                mostrarErro(mensagem, 'Digite sua mensagem.');
                valido = false;
            }

            if (!valido) {
                e.preventDefault(); 
            }
        });

        function mostrarErro(campo, mensagem) {
            const erro = document.createElement('div');
            erro.className = 'erro-form';
            erro.style.color = '#ff005a';
            erro.style.fontSize = '0.95em';
            erro.style.margin = '4px 0 8px 0';
            erro.textContent = mensagem;
            campo.parentNode.appendChild(erro);
        }
    }
});