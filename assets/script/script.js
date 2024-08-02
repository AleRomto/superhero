jQuery(document).ready(function($) {
    // Smooooooth
    function scrollToSection(event) {
        event.preventDefault();
        var $section = $($(this).attr('href'));
        $('html, body').animate({
            scrollTop: $section.offset().top
        }, 500);
    }
    $('[data-scroll]').on('click', scrollToSection);
});


// toda la parafernalia 

$(function () {
    // ingresar el número
    $('form').on('submit', function (event) {
        event.preventDefault();

        // obtener el número del superhéroe 
        var numberHero = parseInt($('#numberHero').val(), 10);

        // limpia la sección azul
        $('#results').html("");
        console.log(numberHero);

        // consulta a la api
        consulta(numberHero);
    });

    // llamar a la api y generar resultados
    function consulta(numberHero) {
        // Valideishon del número
        if (numberHero >= 1 && numberHero <= 732) {
            $.ajax({
                dataType: "json",
                type: "GET",
                url: `https://superheroapi.com/api.php/1e295f39fc93034d1a8819f4a45a9c15/${numberHero}`,
                success: function (results) {
                    console.log(results);

                    // Generar html para los datos de los superhéroes
                    let html_1 = `
                        <div class="card mb-3">
                            <div class="row no-gutters">
                                <div class="col-md-4">
                                    <img src="${results.image.url}" class="card-img" alt="${results.name}">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h2 class="card-title">Nombre: ${results.name}</h2>
                                        <p class="card-text text-justify"><strong>Conexiones:</strong> ${results.connections["group-affiliation"]}</p>
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item text-left"><strong>Publicado por:</strong> ${results.biography.publisher}</li>
                                            <li class="list-group-item text-left"><strong>Ocupación:</strong> ${results.work.occupation}</li>
                                            <li class="list-group-item text-left"><strong>Primera aparición:</strong> ${results.biography["first-appearance"]}</li>
                                            <li class="list-group-item text-left"><strong>Altura:</strong> ${results.appearance.height.join(" - ")}</li>
                                            <li class="list-group-item text-left"><strong>Peso:</strong> ${results.appearance.weight.join(" - ")}</li>
                                            <li class="list-group-item text-left"><strong>Alianzas:</strong> ${results.biography.aliases.join(", ")}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;

                    // gráfico de pastelín
                    var options = {
                        title: {
                            text: `Estadísticas de ${results.name}`,
                            fontSize: 26
                        },
                        data: [
                            {
                                type: "pie",
                                dataPoints: [
                                    { label: "Combat", y: parseInt(results.powerstats.combat, 10) },
                                    { label: "Resistencia", y: parseInt(results.powerstats.durability, 10) },
                                    { label: "Inteligencia", y: parseInt(results.powerstats.intelligence, 10) },
                                    { label: "Velocidad", y: parseInt(results.powerstats.speed, 10) },
                                    { label: "Poder", y: parseInt(results.powerstats.power, 10) },
                                    { label: "Fuerza", y: parseInt(results.powerstats.strength, 10) }
                                ]
                            }
                        ]
                    };

                    // Mostrar resultados
                    $('#results').append(html_1);
                    $('#results').append('<div id="chartContainer" style="height: 500px; width: 100%;"></div>');
                    $('#chartContainer').CanvasJSChart(options);

                    // Limpianding donde se ingresa el número
                    $('#form')[0].reset();

                    // Irse a la sección azul
                    document.querySelector('#blue').scrollIntoView({ behavior: 'smooth' });
                },
                error: function () {
                    alert("Error al consultar información");
                }
            });
        } else {
            alert("Ingresa un número válido entre 1 y 732");
        }
    }

    // volver a la sección amarilla pa buscar de nuevo
    $('#toYellow').on('click', function () {
        document.querySelector('#yellow').scrollIntoView({ behavior: 'smooth' });
    });
});
