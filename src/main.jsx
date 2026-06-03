import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bot,
  Brain,
  Cloud,
  Database,
  Eye,
  Globe2,
  LockKeyhole,
  Rocket,
  Satellite,
  ShieldCheck,
  ThermometerSun,
  Waves
} from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import data from '../data/oceanmind_metrics.json';
import './styles/global.css';

const riskClass = {
  Baixo: 'risk-low',
  Moderado: 'risk-medium',
  Alto: 'risk-high',
  Crítico: 'risk-critical'
};

function MetricCard({ icon: Icon, label, value, detail }) {
  return (
    <article className="metric-card">
      <div className="metric-icon"><Icon size={20} /></div>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
        {detail && <span>{detail}</span>}
      </div>
    </article>
  );
}

function SectionTitle({ icon: Icon, eyebrow, title, description }) {
  return (
    <div className="section-title">
      <div className="eyebrow"><Icon size={16} /> {eyebrow}</div>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function App() {
  const { summary } = data;

  return (
    <main>
      <section className="hero">
        <nav className="topbar">
          <div className="brand"><Waves size={24} /> OceanMind</div>
          <div className="nav-links">
            <a href="#dashboard">Dashboard</a>
            <a href="#ia">IA</a>
            <a href="#arquitetura">Arquitetura</a>
            <a href="#devops">DevOps</a>
          </div>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <div className="badge"><Satellite size={16} /> Global Solution 2026 · Indústria Espacial</div>
            <h1>Inteligência oceânica via dados espaciais.</h1>
            <p>
              Plataforma demonstrativa para monitorar aquecimento oceânico, detectar anomalias ambientais,
              classificar níveis de risco e emitir alertas automáticos para regiões marítimas e costeiras.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#dashboard">Ver dashboard</a>
              <a className="button secondary" href="#arquitetura">Como funciona</a>
            </div>
          </div>

          <aside className="hero-panel">
            <div className="orbital-card">
              <Globe2 size={32} />
              <div>
                <span>Status geral</span>
                <strong>{summary.generalRisk}</strong>
                <p>Atualizado em {summary.lastPipelineRun}</p>
              </div>
            </div>
            <div className="mini-grid">
              <div><strong>{summary.monitoredRegions}</strong><span>regiões</span></div>
              <div><strong>{summary.activeAlerts}</strong><span>alertas</span></div>
              <div><strong>{summary.processedRecords.toLocaleString('pt-BR')}</strong><span>registros</span></div>
            </div>
          </aside>
        </div>
      </section>

      <section className="ods-strip">
        <div><strong>ODS 13</strong><span>Ação Climática</span></div>
        <div><strong>ODS 9</strong><span>Inovação e Infraestrutura</span></div>
        <div><strong>ODS 11</strong><span>Cidades e Comunidades Sustentáveis</span></div>
      </section>

      <section id="dashboard" className="content-block">
        <SectionTitle
          icon={BarChart3}
          eyebrow="Monitoramento"
          title="Painel operacional do OceanMind"
          description="Indicadores simulados integrando dados processados pelo pipeline, previsão de IA, visão computacional e alertas automáticos."
        />

        <div className="metrics-grid">
          <MetricCard icon={ThermometerSun} label="Temperatura média" value={`${summary.averageSeaTemperature}°C`} detail="superfície oceânica" />
          <MetricCard icon={Activity} label="Anomalia térmica" value={`+${summary.averageThermalAnomaly}°C`} detail="média monitorada" />
          <MetricCard icon={AlertTriangle} label="Alertas ativos" value={summary.activeAlerts} detail="alto ou crítico" />
          <MetricCard icon={Database} label="Registros processados" value={summary.processedRecords.toLocaleString('pt-BR')} detail="pipeline BDDI" />
        </div>

        <div className="dashboard-grid">
          <div className="card large-card">
            <h3>Evolução térmica</h3>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={data.temperatureSeries}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="normal" name="Média histórica" strokeWidth={2} fillOpacity={0.2} />
                <Area type="monotone" dataKey="current" name="Temperatura atual" strokeWidth={2} fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="card">
            <h3>Distribuição de risco</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={data.riskDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="risk" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" name="Regiões" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card table-card">
          <h3>Regiões críticas monitoradas</h3>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Região</th>
                  <th>Temperatura</th>
                  <th>Anomalia</th>
                  <th>Vento</th>
                  <th>Pressão</th>
                  <th>Risco</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.regions.map((region) => (
                  <tr key={region.name}>
                    <td>{region.name}</td>
                    <td>{region.temperature}°C</td>
                    <td>+{region.anomaly}°C</td>
                    <td>{region.wind} km/h</td>
                    <td>{region.pressure} hPa</td>
                    <td><span className={`risk-pill ${riskClass[region.risk]}`}>{region.risk}</span></td>
                    <td>{region.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="ia" className="content-block split-grid">
        <div className="card highlight-card">
          <SectionTitle
            icon={Brain}
            eyebrow="GAIE"
            title="Previsão com Machine Learning"
            description="Resultado demonstrativo do modelo preditivo usado para classificar risco oceânico."
          />
          <div className="prediction-box">
            <div>
              <span>Região</span>
              <strong>{data.aiPrediction.region}</strong>
            </div>
            <div>
              <span>Modelo</span>
              <strong>{data.aiPrediction.model}</strong>
            </div>
            <div>
              <span>Risco previsto</span>
              <strong className="critical-text">{data.aiPrediction.risk}</strong>
            </div>
            <div>
              <span>Confiança</span>
              <strong>{data.aiPrediction.confidence}%</strong>
            </div>
          </div>
          <ul className="feature-list">
            <li>Temperatura: {data.aiPrediction.seaTemperature}°C</li>
            <li>Anomalia: +{data.aiPrediction.thermalAnomaly}°C</li>
            <li>Vento: {data.aiPrediction.windSpeed} km/h</li>
            <li>Pressão: {data.aiPrediction.pressure} hPa</li>
          </ul>
        </div>

        <div className="card">
          <SectionTitle
            icon={ShieldCheck}
            eyebrow="SHAP"
            title="Variáveis mais influentes"
            description="Ranking demonstrativo de interpretabilidade do modelo."
          />
          <div className="shap-list">
            {data.shapRanking.map((item) => (
              <div className="shap-item" key={item.feature}>
                <span>{item.feature}</span>
                <div className="bar-track"><div style={{ width: `${item.importance * 100}%` }} /></div>
                <strong>{Math.round(item.importance * 100)}%</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-block split-grid">
        <div className="card">
          <SectionTitle
            icon={Eye}
            eyebrow="ACV"
            title="Análise de imagem oceânica"
            description="Exibição do resultado gerado por uma CNN treinada do zero para classificação ambiental."
          />
          <div className="image-placeholder">
            <Waves size={56} />
            <span>{data.computerVision.imageName}</span>
          </div>
          <div className="prediction-box compact">
            <div><span>Modelo</span><strong>{data.computerVision.model}</strong></div>
            <div><span>Classe</span><strong>{data.computerVision.classification}</strong></div>
            <div><span>Confiança</span><strong>{data.computerVision.confidence}%</strong></div>
          </div>
        </div>

        <div className="card">
          <SectionTitle
            icon={Bot}
            eyebrow="RPA"
            title="Alertas automáticos"
            description="Eventos que simulam a ação do robô de monitoramento e resposta operacional."
          />
          <div className="alerts-list">
            {data.rpaAlerts.map((alert, index) => (
              <div className="alert-row" key={`${alert.region}-${index}`}>
                <span className={`risk-pill ${riskClass[alert.level]}`}>{alert.level}</span>
                <div>
                  <strong>{alert.region}</strong>
                  <p>{alert.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="arquitetura" className="content-block">
        <SectionTitle
          icon={Rocket}
          eyebrow="Arquitetura integrada"
          title="Fluxo técnico da solução"
          description="Representação visual de como as disciplinas se conectam dentro do OceanMind."
        />
        <div className="architecture">
          <div><Satellite /><strong>APIs NASA/NOAA</strong><span>dados espaciais e ambientais</span></div>
          <div><Database /><strong>Airflow + Banco</strong><span>extração, tratamento e SQL</span></div>
          <div><Brain /><strong>Modelo IA</strong><span>classificação de risco</span></div>
          <div><Eye /><strong>CNN</strong><span>classificação de imagens</span></div>
          <div><Cloud /><strong>Azure App Service</strong><span>dashboard público</span></div>
          <div><Bot /><strong>RPA</strong><span>alertas e registros</span></div>
        </div>
      </section>

      <section id="devops" className="content-block">
        <SectionTitle
          icon={LockKeyhole}
          eyebrow="SDTCC"
          title="DevSecOps e Cloud Computing"
          description="Itens de infraestrutura esperados para a entrega da disciplina de Secure DevOps Tools & Cloud Computing."
        />
        <div className="devops-grid">
          <div className="devops-item"><ShieldCheck /> Azure App Service com HTTPS</div>
          <div className="devops-item"><Rocket /> GitHub Actions com deploy automático</div>
          <div className="devops-item"><LockKeyhole /> GitHub Secrets e Azure Key Vault</div>
          <div className="devops-item"><Activity /> Application Insights e Alert Rule</div>
        </div>
      </section>
      <section id="equipe" className="content-block">
        <SectionTitle
          icon={Users}
          eyebrow="Equipe"
          title="Integrantes do projeto"
          description="Grupo responsável pelo desenvolvimento do OceanMind na Global Solution 2026."
        />
        <div className="devops-grid">
          {teamMembers.map((member) => (
            <div className="devops-item" key={member.rm}>
              <Users size={20} />
              <div>
                <strong>{member.name}</strong>
                <span>RM {member.rm}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
      <footer>
        <strong>OceanMind · FIAP Global Solution 2026</strong>
        <span>Engenharia de Software · 4º ano · Projeto demonstrativo para Indústria Espacial</span>
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
