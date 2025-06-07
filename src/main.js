import './style.css'
import { format } from "date-fns";
document.addEventListener("DOMContentLoaded", function () {
  const app = document.querySelector("#app");
  const sort = document.getElementById("sort");
  let sortValue = "title.asc"
  const form = document.getElementsByTagName("form")[0];
  const date = document.getElementById("date")
  const today = new Date().toISOString().split('T')[0];
  const sortAction = function (e) {
    sortValue = sort.value;
    if (sortValue === undefined) {
      sortValue = "title.asc"
    }
    renderArticles(sortValue);

  }
  async function fetchArticles(sortValue) {

    try {
      const response = await fetch('https://xzytbiukrjdolrymcmrd.supabase.co/rest/v1/article?order=' + sortValue, {
        headers: {
          apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6eXRiaXVrcmpkb2xyeW1jbXJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyNjQxMTEsImV4cCI6MjA2Mzg0MDExMX0.oEf2LfJLGBP_cNWhAAuGicUT8lXS1vI-ayhIBs8vN0k',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6eXRiaXVrcmpkb2xyeW1jbXJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyNjQxMTEsImV4cCI6MjA2Mzg0MDExMX0.oEf2LfJLGBP_cNWhAAuGicUT8lXS1vI-ayhIBs8vN0k',
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);
      return data;

    } catch (error) {
      console.error(error);
    }
  }
  async function renderArticles(sortValue) {
    const data = await fetchArticles(sortValue);
    let html = '';
    for (let i = 0; i < data.length; i++) {
      const article = data[i];
      html +=
        '<div class="article">' +
        '<h2>' + article.title +
        '</h2>' +
        '<h4>' + article.subtitle + '</h4>' +
        '<p><strong>Autor:</strong> ' + article.author + '</p>' +
        '<p><strong>Data:</strong> ' + format(article.created_at, 'dd-MM-yyyy') + '</p>' +
        '<p>' + article.content + '</p>' +
        '<hr>' +
        '</div>';
    }
    app.innerHTML = html;
  }

  renderArticles(sortValue);

  async function createNewArticle(title, subtitle, author, content, created_at) {
    try {
      const response = await fetch('https://xzytbiukrjdolrymcmrd.supabase.co/rest/v1/article', {
        method: 'POST',
        headers: {
          apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6eXRiaXVrcmpkb2xyeW1jbXJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyNjQxMTEsImV4cCI6MjA2Mzg0MDExMX0.oEf2LfJLGBP_cNWhAAuGicUT8lXS1vI-ayhIBs8vN0k',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6eXRiaXVrcmpkb2xyeW1jbXJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyNjQxMTEsImV4cCI6MjA2Mzg0MDExMX0.oEf2LfJLGBP_cNWhAAuGicUT8lXS1vI-ayhIBs8vN0k',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, subtitle, author, content, created_at })

      });

      console.log("Poprawnie przesłano artykuł!")
      alert("Poprawnie przesłano artykuł!")
      if (response.status !== 201) {
        throw new Error(`Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };


  const formAction = function (e) {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const subtitle = document.getElementById("subtitle").value;
    const author = document.getElementById("author").value;
    const content = document.getElementById("content").value;
    let created_at = date.value;
    if (created_at === undefined || created_at === '') {
      created_at = today;
    }
    created_at = new Date(created_at).toISOString();
    createNewArticle(title, subtitle, author, content, created_at);
    form.reset();

  }
  form.addEventListener('submit', formAction);
  sort.addEventListener('change', sortAction);
});