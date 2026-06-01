# OceanMind — Dashboard SDTCC / Azure

Dashboard web demonstrativo para a Global Solution 2026 da FIAP, conectado ao tema **Indústria Espacial: O Código que Move o Universo**.

O projeto representa a camada de **Secure DevOps Tools & Cloud Computing (SDTCC)** do OceanMind, uma plataforma de inteligência oceânica que utiliza dados espaciais, climáticos e ambientais para monitorar aquecimento oceânico, detectar anomalias e apoiar decisões em regiões marítimas e costeiras.

## O que esta aplicação mostra

- Identidade do produto OceanMind.
- Problema espacial/ambiental resolvido.
- ODS conectados ao desafio.
- Cards de temperatura oceânica, anomalia térmica, alertas e registros processados.
- Tabela de regiões críticas.
- Gráficos de evolução térmica e distribuição de risco.
- Resultado demonstrativo do modelo de IA/ML da disciplina GAIE.
- Ranking SHAP demonstrativo.
- Resultado demonstrativo da CNN da disciplina ACV.
- Feed de alertas automáticos da disciplina RPA.
- Arquitetura integrada do projeto.
- Seção de DevSecOps com Azure, GitHub Actions, Secrets, Key Vault, Application Insights e Alert Rule.

## Stack

- React
- Vite
- Recharts
- Lucide React
- Azure App Service
- GitHub Actions

## Como rodar localmente

```bash
npm install
npm run dev
```

Acesse:

```text
http://localhost:5173
```

## Como gerar build

```bash
npm run build
npm run preview
```

A pasta final será gerada em:

```text
dist/
```

## Dados simulados

Os dados demonstrativos ficam em:

```text
data/oceanmind_metrics.json
```

Você pode alterar esse arquivo para conectar visualmente os resultados reais das outras matérias:

- BDDI: dados processados pelo pipeline Airflow.
- GAIE: resultado do modelo preditivo e SHAP.
- ACV: resultado da CNN.
- RPA: alertas emitidos pelo robô.

## GitHub Secrets esperados

Crie os seguintes secrets no repositório GitHub:

```text
AZURE_CREDENTIALS
AZURE_WEBAPP_NAME
```

`AZURE_CREDENTIALS` deve conter o JSON de credenciais do Service Principal do Azure.

`AZURE_WEBAPP_NAME` deve conter o nome exato do App Service criado no Azure.

## Entrega SDTCC — checklist

- [ ] Aplicação publicada no Azure App Service.
- [ ] HTTPS ativo.
- [ ] Workflow GitHub Actions funcionando.
- [ ] Pelo menos 2 deploys automáticos com commits diferentes.
- [ ] GitHub Secrets configurados.
- [ ] Azure Key Vault criado com pelo menos 1 secret relacionado ao projeto.
- [ ] Role Assignment IAM documentado.
- [ ] Application Insights ativado.
- [ ] Alert Rule criada.
- [ ] Evidência de Log Stream ou Metrics.
- [ ] PDF técnico com prints e link do App Service.

## Estrutura

```text
oceanmind-sdtcc-dashboard/
├── .github/workflows/azure-deploy.yml
├── data/oceanmind_metrics.json
├── docs/relatorio_azure_base.md
├── public/
├── src/
│   ├── main.jsx
│   └── styles/global.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Observação

Esta aplicação foi construída para ser a vitrine central do OceanMind. Ela não substitui as entregas individuais de GAIE, BDDI, ACV, RPA e PBML, mas pode exibir os resultados delas no dashboard.
