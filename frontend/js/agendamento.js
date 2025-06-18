
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = form.querySelector("input[type='text']").value;
    const email = form.querySelector("input[type='email']").value;
    const servico = form.querySelector("select").value;
    const dataHora = form.querySelector("input[type='datetime-local']").value;

    const agendamento = { nome, email, servico, dataHora };

    let agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];
    agendamentos.push(agendamento);
    localStorage.setItem("agendamentos", JSON.stringify(agendamentos));

    alert("Agendamento realizado com sucesso!");
    form.reset();
  });
});
