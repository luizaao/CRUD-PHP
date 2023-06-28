jQuery(document).ready(function ($) {
  //FIXED HEADER
  window.onscroll = function () {
    if (window.pageYOffset > 140) {
      $("#header").addClass("active");
    } else {
      $("#header").removeClass("active");
    }
  };

  //ISOTOPE
  let btns = $("#servicos .button-group button");

  btns.click(function (e) {
    $("#servicos .button-group button").removeClass("active");
    e.target.classList.add("active");

    let selector = $(e.target).attr("data-filter");
    $("#servicos .grid").isotope({
      filter: selector,
    });
  });

  $(window).on("load", function () {
    $("#servicos .grid").isotope({
      filter: "*",
    });
  });

  //MAGNIFY
  $(".grid .popup-link").magnificPopup({
    type: "image",
    gallery: {
      enabled: true,
      tPrev: "Anterior",
      tNext: "Próxima",
      tCounter: "%curr% de %total%",
    },
  });

  //OWL
  $(".owl-carousel").owlCarousel({
    loop: false,
    margin: 30,
    autoplay: true,
    autoplayTimeout: 6000,
    dots: true,
    lazyLoad: true,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 2,
      },
    },
  });
});


function carregarCadastros() {
  fetch('api.php?endpoint=Cadastro')
      .then(response => response.json())
      .then(Cadastros => {
          let Cadastros = '';

          for (let i = 0; i < Cadastros.length; i++) {

              const dateString = Cadastros[i].data;
              const splitDate = dateString.split('-');
              const formatDate = splitDate[2] + '/' + splitDate[1] + '/' + splitDate[0];
              
              Cadastros += '<li>ID: ' + Cadastros[i].id + ' || Nome: ' + Cadastros[i].name + ' || Email: ' + Cadastros[i].email + ' || Senha: ' + Cadastros[i].senha + ' || Data de Modifição: ' + formatDate + '<div><button onclick="excluirCadastro(' + Cadastros[i].id + ')"><i class="bx bx-message-square-x"></i></button></div>' + '</li>';
              
          }

          document.getElementById('Cadastros').innerHTML = Cadastros;

      })
      .catch(error => {
          console.error('Erro ao carregar os Cadastros:', error);
      });
}


function adicionarCadastro() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (name && email && password) {
  fetch('api.php?endpoint=Cadastro', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'name=' + encodeURIComponent(name) + '&email=' + encodeURIComponent(email) + '&password=' + encodeURIComponent(password)
  })
      .then(response => {
          if (response.ok) {
              carregarCadastros();
          } else {
              console.error('Erro ao adicionar o Cadastro:', response.status);
          }
      })
      .catch(error => {
          console.error('Error ao adicionar o Cadastro:', error);
      });
  } else {
      console.error('Por favor, preencha todos os campos.');
  }
}

function cadastrarAtivado() {
  document.getElementById('container-update').style.display = 'none';
  document.getElementById('container-add').style.display = 'grid';
}

function editarAtivado() {
  document.getElementById('container-update').style.display = 'grid';
  document.getElementById('container-add').style.display = 'none';
}


function atualizarCadastro() {
  const id = document.getElementById('id').value;
  const newName = document.getElementById('novoNome').value;
  const newEmail = document.getElementById('novoEmail').value;
  const newPassword = document.getElementById('novaSenha').value;

  if (id && newName && newEmail && newPassword) {
  fetch('api.php?endpoint=Cadastros&id=' + id, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'newName=' + encodeURIComponent(newName) + '&newEmail=' + encodeURIComponent(newEmail) + '&newPassword=' + encodeURIComponent(newPassword)
   })
      .then(response => {
          if (response.ok) {
              carregarCadastros();
          } else {
              console.error('Erro ao atualizar o Cadastro:', response.status);
          }
      })
      .catch(error => {
          console.error('Erro ao atualizar o Cadastro:', error);
      });
  } else {
      console.error('Por favor, preencha todos os campos.');
  }
}


function excluirCadastro(id) {
       
  fetch('api.php?endpoint=Cadastros&id=' + id, {
      method: 'DELETE'
  })
      .then(response => {
          if (response.ok) {
              carregarCadastros();
          } else {
              console.error('Erro ao excluir o Cadastro:', response.status);
          }
      })
      .catch(error => {
          console.error('Erro ao excluir o Cadastro:', error);
      });

}


window.onload = function () {
  carregarCadastros();
};
