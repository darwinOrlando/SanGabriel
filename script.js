document.addEventListener('DOMContentLoaded', function () {
    // Menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('#nav');

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // Submenús en móvil
    const menuItemsWithChildren = document.querySelectorAll('.menu-item-has-children');
    menuItemsWithChildren.forEach(item => {
        const link = item.querySelector('a');

        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const subMenu = item.querySelector('.sub-menu');
                subMenu.classList.toggle('active');
            }
        });
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.hash !== "") {
                e.preventDefault();

                const target = document.querySelector(this.hash);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });

                    // Cerrar menú en móvil
                    if (window.innerWidth <= 768) {
                        nav.classList.remove('active');
                    }

                    // Actualizar URL sin recargar
                    history.pushState(null, null, this.hash);
                }
            }
        });
    });


    /////////////////////////////// asignaturas//////////


    // ===== FILTRADO DE ASIGNATURAS =====
    const filtroBtns = document.querySelectorAll('.filtro-btn');
    const asignaturasCards = document.querySelectorAll('.asignatura-card');

    filtroBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover clase active de todos los botones
            filtroBtns.forEach(b => b.classList.remove('active'));
            // Añadir clase active al botón clickeado
            btn.classList.add('active');

            const filtro = btn.getAttribute('data-filter');

            // Mostrar/ocultar tarjetas según filtro
            asignaturasCards.forEach(card => {
                if (filtro === 'todas') {
                    card.style.display = 'block';
                } else {
                    card.style.display = card.getAttribute('data-categoria') === filtro ? 'block' : 'none';
                }
            });
        });
    });

    // ===== MODAL DE DETALLES =====
    const modal = document.getElementById('modalAsignatura');
    const btnsDetalle = document.querySelectorAll('.btn-detalle');
    const closeModal = document.querySelector('.close-modal');

    // Base de datos de asignaturas (puedes reemplazar con una API)
    const asignaturasData = {
        "química": {
            titulo: "Química",
            area: "Ciencias Naturales",
            docente: "Lic. Marco Guzman",
            horario: "Lunes y Miércoles 10:00-12:00",
            descripcion: "Esta asignatura introduce los principios fundamentales de la química, incluyendo estructura atómica, enlaces químicos y reacciones.",
            objetivos: [
                "Comprender la estructura de la materia",
                "Balancear ecuaciones químicas",
                "Realizar cálculos estequiométricos"
            ]
        },
        "matemáticas": {
            titulo: "Matemáticas",
            area: "Ciencias Exactas",
            docente: "Lic. Mauricio Bayas",
            horario: "Martes y Jueves 08:00-10:00",
            descripcion: "Desarrollo del pensamiento lógico-matemático mediante álgebra, geometría y cálculo.",
            objetivos: [
                "Resolver problemas matemáticos",
                "Aplicar conceptos algebraicos",
                "Desarrollar pensamiento crítico"
            ]
        },

        // Agrega más asignaturas según necesites
        "programación": {
            titulo: "Programación",
            area: "Técnica",
            docente: "Ing. Darwin Mendoza",
            horario: "Lunes a Viernes 14:00-15:00",
            descripcion: "Es el proceso mediante el cual una persona (programador o desarrollador) crea instrucciones para que una computadora o dispositivo electrónico realice tareas específicas. Estas instrucciones se escriben en un lenguaje de programación, que puede ser comprendido por las máquinas. Programar permite desarrollar software, como aplicaciones, videojuegos, páginas web, sistemas operativos o robots. Es una herramienta fundamental en la tecnología moderna, ya que está presente en casi todos los dispositivos que usamos a diario.",
            objetivos: [
                "Desarrollar el pensamiento lógico y creativo.",
                "Resolver problemas de manera eficiente.",
                "Crear aplicaciones útiles para la vida cotidiana o profesional."
            ]
        },
        "soporte técnico": {
            titulo: "Tecnico",
            area: "Técnica",
            docente: "Ing. Darwin Mendoza",
            horario: "Lunes de 12:10-1:30",
            descripcion: "Es el proceso mediante el cual una persona (programador o desarrollador) crea instrucciones para que una computadora o dispositivo electrónico realice tareas específicas. Estas instrucciones se escriben en un lenguaje de programación, que puede ser comprendido por las máquinas. Programar permite desarrollar software, como aplicaciones, videojuegos, páginas web, sistemas operativos o robots. Es una herramienta fundamental en la tecnología moderna, ya que está presente en casi todos los dispositivos que usamos a diario.",
            objetivos: [
                "Desarrollar el pensamiento lógico y creativo.",
                "Resolver problemas de manera eficiente.",
                "Crear aplicaciones útiles para la vida cotidiana o profesional."
            ]
        },
        "diseño web": {
            titulo: "Programación",
            area: "Técnica",
            docente: "Ing. Darwin Mendoza",
            horario: "Lunes a Viernes 14:00-15:00",
            descripcion: "Es el proceso mediante el cual una persona (programador o desarrollador) crea instrucciones para que una computadora o dispositivo electrónico realice tareas específicas. Estas instrucciones se escriben en un lenguaje de programación, que puede ser comprendido por las máquinas. Programar permite desarrollar software, como aplicaciones, videojuegos, páginas web, sistemas operativos o robots. Es una herramienta fundamental en la tecnología moderna, ya que está presente en casi todos los dispositivos que usamos a diario.",
            objetivos: [
                "Desarrollar el pensamiento lógico y creativo.",
                "Resolver problemas de manera eficiente.",
                "Crear aplicaciones útiles para la vida cotidiana o profesional."
            ]
        },
        "formación laboral": {
            titulo: "Orientación",
            area: "Técnica",
            docente: "Ing. Darwin Mendoza",
            horario: "Lunes a Viernes 14:00-15:00",
            descripcion: "Es el proceso mediante el cual una persona (programador o desarrollador) crea instrucciones para que una computadora o dispositivo electrónico realice tareas específicas. Estas instrucciones se escriben en un lenguaje de programación, que puede ser comprendido por las máquinas. Programar permite desarrollar software, como aplicaciones, videojuegos, páginas web, sistemas operativos o robots. Es una herramienta fundamental en la tecnología moderna, ya que está presente en casi todos los dispositivos que usamos a diario.",
            objetivos: [
                "Desarrollar el pensamiento lógico y creativo.",
                "Resolver problemas de manera eficiente.",
                "Crear aplicaciones útiles para la vida cotidiana o profesional."
            ]
        },

         "lengua y literatura": {
            titulo: "Lengua y Literatura",
            area: "Disciplina",
            docente: " Lic. Mauricio Bayas ",
            horario: "Lunes a Viernes 7:30-9:30",
            descripcion: "Se encarga del estudio del idioma, su uso correcto y expresivo, así como del análisis y disfrute de obras literarias. Esta disciplina combina el aprendizaje de la comunicación oral y escrita, la gramática y la lectura comprensiva, con el conocimiento de la literatura como una manifestación artística y cultural. A través de esta área, los estudiantes desarrollan habilidades para comprender, interpretar y producir textos, además de fortalecer su capacidad de pensamiento crítico, creatividad y expresión personal. También permite conocer y valorar las obras literarias más importantes, entendiendo su contexto histórico, social y cultural.",
            objetivos: [
                "Desarrollar la comprensión y producción oral y escrita.",
                "Fomentar el gusto por la lectura literaria y no literaria.",
                "Analizar obras literarias de diferentes épocas, autores y géneros."
            ]
        },
        "sistemas operativos": {
            titulo: "SISTEMAS OPERATIVOS",
            area: "tecnologia",
            docente: "Maria olivo ",
            horario: "Lunes a Viernes 7:30-14:00",
            descripcion: "Un sistema operativo (SO) es un conjunto de programas que actúan como intermediario entre el usuario y el hardware de una computadora o dispositivo. Su función principal es gestionar los recursos del sistema (como el procesador, la memoria, los dispositivos de entrada/salida) y proporcionar una interfaz para que los usuarios y las aplicaciones puedan interactuar con el hardware de forma sencilla y eficiente.",
            objetivos: [
                "Gestión de procesos: controla la ejecución de programas, asigna recursos y gestiona la multitarea.",
                "Gestión de memoria: administra el uso de la memoria RAM, asignando espacio a procesos y asegurando que no se interfieran entre sí.",
                "Gestión del almacenamiento: organiza y controla el acceso a los datos en discos duros, SSDs, etc."
            ]
        },
        "aplicaciones ofimaticas": {
            titulo: "SISTEMAS OPERATIVOS",
            area: "tecnologia",
            docente: "Maria olivo ",
            horario: "Lunes a Viernes 7:30-14:00",
            descripcion: "Un sistema operativo (SO) es un conjunto de programas que actúan como intermediario entre el usuario y el hardware de una computadora o dispositivo. Su función principal es gestionar los recursos del sistema (como el procesador, la memoria, los dispositivos de entrada/salida) y proporcionar una interfaz para que los usuarios y las aplicaciones puedan interactuar con el hardware de forma sencilla y eficiente.",
            objetivos: [
                "Gestión de procesos: controla la ejecución de programas, asigna recursos y gestiona la multitarea.",
                "Gestión de memoria: administra el uso de la memoria RAM, asignando espacio a procesos y asegurando que no se interfieran entre sí.",
                "Gestión del almacenamiento: organiza y controla el acceso a los datos en discos duros, SSDs, etc."
            ]
        },
    };

    // Abrir modal con datos
    btnsDetalle.forEach(btn => {
        btn.addEventListener('click', () => {
            const asignaturaNombre = btn.closest('.asignatura-card').querySelector('h3').textContent.toLowerCase();
            const datos = asignaturasData[asignaturaNombre] || {
                titulo: asignaturaNombre.charAt(0).toUpperCase() + asignaturaNombre.slice(1),
                area: "Área general",
                docente: "Docente por asignar",
                horario: "Horario no definido",
                descripcion: "Información detallada no disponible.",
                objetivos: ["Objetivos en definición"]
            };

            // Llenar el modal
            document.getElementById('modal-titulo').textContent = datos.titulo;
            document.getElementById('modal-area').textContent = datos.area;
            document.getElementById('modal-docente').textContent = datos.docente;
            document.getElementById('modal-horario').textContent = datos.horario;
            document.getElementById('modal-texto').textContent = datos.descripcion;

            const objetivosList = document.getElementById('modal-lista');
            objetivosList.innerHTML = '';
            datos.objetivos.forEach(obj => {
                objetivosList.innerHTML += `<li>${obj}</li>`;
            });

            // Mostrar modal
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Cerrar modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Cerrar al hacer clic fuera
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // ===== EFECTO SCROLL SUAVE =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.hash !== "") {
                e.preventDefault();
                const target = document.querySelector(this.hash);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });


    ///////////////////

    // Filtrado de noticias
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover active de todos los botones
            filterBtns.forEach(b => b.classList.remove('active'));
            // Añadir active al clickeado
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            const newsCards = document.querySelectorAll('.news-card');

            newsCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Modales de noticias
    const newsModalBtns = document.querySelectorAll('.news-modal-btn');
    const newsModal = document.getElementById('newsModal');
    const closeModalBtns = document.querySelectorAll('.close-modal');

    newsModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const newsId = btn.getAttribute('data-news-id'); // recoge codigo de evento 1,2,....
            loadNewsModal(newsId);
            newsModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Modales de asignaturas
    const subjectModalBtns = document.querySelectorAll('.subject-modal-btn');
    const subjectModal = document.getElementById('subjectModal');

    subjectModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const subjectCard = btn.closest('.subject-card');
            const subject = subjectCard.getAttribute('data-subject');
            loadSubjectModal(subject);
            subjectModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Cerrar modales
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
            document.body.style.overflow = 'auto';
        });
    });

    // Cerrar al hacer clic fuera del modal
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Cargar datos del modal de noticias
    function loadNewsModal(newsId) {
        // En un proyecto real, esto sería una llamada AJAX
        const newsData = {
            '1': {
                title: 'Casa Abierta -2025',
                description: 'matemático y el trabajo en equipo.',
                date: '15 de Noviembre, 2023',
                location: 'Auditorio Principal',
                images: [
                    'imagenes/casaAbierta.jpeg',
                    'imagenes/casaAbierta2.jpeg',
                    'imagenes/casaAbierta3.jpeg'
                   
                ]
            },
            '2': {
                title: 'Campeonato interno',
                description: 'El pasado 15 de noviembre se realizaron las olimpiadas matemáticas anuales donde participaron estudiantes de todos los cursos. El evento promueve el pensamiento lógico-matemático y el trabajo en equipo.',
                date: '15 de Noviembre, 2023',
                location: 'Auditorio Principal',
                images: [
                    'imagenes/histoTodos4.jpg',
                    'imagenes/todosSG.jpeg',
                    'imagenes/SoloColegio.png'
                     
                ]
            }
        };

        const data = newsData[newsId] || {};

        document.getElementById('modal-title').textContent = data.title || 'Evento';
        document.getElementById('modal-description').textContent = data.description || 'Descripción no disponible';
        document.getElementById('modal-date').textContent = data.date || 'Fecha no especificada';
        document.getElementById('modal-location').textContent = data.location || 'Lugar no especificado';

        const gallery = document.querySelector('.modal-gallery');
        gallery.innerHTML = '';

        if (data.images && data.images.length > 0) {
            data.images.forEach(img => {
                gallery.innerHTML += `<img src="${img}" alt="${data.title}">`;
            });
        } else {
            gallery.innerHTML = '<p>No hay imágenes disponibles</p>';
        }
    }

/******************Carrucel ************************* */
// Carrusel de Historia
const carouselInner = document.querySelector('.carousel-inner');
const items = document.querySelectorAll('.carousel-item');
const dotsContainer = document.querySelector('.carousel-dots');
let currentIndex = 0;

// Crear dots de navegación
items.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if(index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

// Botones de control
document.querySelector('.prev').addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1;
    updateCarousel();
});

document.querySelector('.next').addEventListener('click', () => {
    currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
    updateCarousel();
});

function updateCarousel() {
    carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Actualizar dots
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

// Auto-avance cada 5 segundos
setInterval(() => {
    currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
    updateCarousel();
}, 5000);

// Modal "Leer más"
const modalHistoria = document.getElementById('modalHistoria');
const btnLeerMas = document.querySelector('.btn-leer-mas');
const closeModalCarr = document.querySelector('.modal-historia .close-modal');

btnLeerMas.addEventListener('click', () => {
    modalHistoria.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

closeModalCarr.addEventListener('click', () => {
    modalHistoria.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if(e.target === modalHistoria) {
        modalHistoria.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});
/********************     fin carrucel                         *********************** */

});