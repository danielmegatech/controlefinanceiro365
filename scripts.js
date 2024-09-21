        let entradas = []; // Array para armazenar entradas

        // Função para alternar entre modos claro e escuro
        function toggleMode() {
            const body = document.body;
            const icon = document.getElementById('mode-icon');
            const footer = document.getElementById('footer');
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                body.style.backgroundColor = '#333';
                body.style.color = '#fff';
                footer.classList.add('dark-mode'); // Adiciona a classe ao rodapé
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            } else {
                body.style.backgroundColor = '#fff';
                body.style.color = '#333';
                footer.classList.remove('dark-mode'); // Remove a classe do rodapé
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        }

        // Função para importar dados
        function importarBackup() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json'; // Permitir apenas arquivos JSON
            input.onchange = e => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.readAsText(file, 'UTF-8');
                reader.onload = readerEvent => {
                    const content = readerEvent.target.result;
                    try {
                        entradas = JSON.parse(content);
                        salvarDadosLocalStorage();
                        alert('Backup importado com sucesso!');
                    } catch (error) {
                        alert('Erro ao importar o arquivo. Verifique se o formato está correto.');
                    }
                }
            }
            input.click();
        }

        // Função para exportar dados em JSON
        function exportarDados() {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(entradas));
            const downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute("href", dataStr);
            downloadAnchorNode.setAttribute("download", "controle_financeiro_export.json");
            document.body.appendChild(downloadAnchorNode);
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
        }

        // Função para imprimir a página
        function imprimirPagina() {
            window.print();
        }

        // Função para exportar em PDF
        async function exportarPDF() {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            doc.text("Controle Financeiro", 10, 10);
            doc.text(JSON.stringify(entradas, null, 2), 10, 20);
            doc.save("controle_financeiro.pdf");
        }

        // Função para exportar em XLS
        function exportarXLS() {
            const ws = XLSX.utils.json_to_sheet(entradas);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Entradas");
            XLSX.writeFile(wb, "controle_financeiro.xlsx");
        }

        // Função para carregar dados do localStorage
        function carregarDadosLocalStorage() {
            const dadosSalvos = localStorage.getItem('entradas');
            if (dadosSalvos) {
                entradas = JSON.parse(dadosSalvos);
            }
        }

        // Função para salvar dados no localStorage
        function salvarDadosLocalStorage() {
            localStorage.setItem('entradas', JSON.stringify(entradas));
        }

        // Inicialização da página
        window.onload = carregarDadosLocalStorage;