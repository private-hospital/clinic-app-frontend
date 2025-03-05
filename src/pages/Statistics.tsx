import { useNavigate } from 'react-router';
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
  ChangeEvent,
} from 'react';
import * as d3 from 'd3';
import { AuthContext } from '../components/AuthContext';
import { assertAuth } from '../service/navigationUtils';
import { UserRoles } from '../types/users';
import '../styles/authPages.css';
import Header from '../components/Header';
import '../styles/Statistics.css';

const dailyData = [
  { date: '24.02', count: 12 },
  { date: '25.02', count: 18 },
  { date: '26.02', count: 10 },
  { date: '27.02', count: 22 },
  { date: '28.02', count: 16 },
  { date: '01.03', count: 25 },
  { date: '02.03', count: 14 },
];

const hourlyData = [
  { hour: '09:00', count: 2 },
  { hour: '10:00', count: 5 },
  { hour: '11:00', count: 8 },
  { hour: '12:00', count: 10 },
  { hour: '13:00', count: 7 },
  { hour: '14:00', count: 12 },
  { hour: '15:00', count: 9 },
  { hour: '16:00', count: 11 },
  { hour: '17:00', count: 6 },
  { hour: '18:00', count: 4 },
];

const doctors = [
  { id: '1', name: 'Петренко Андрій Сергійович' },
  { id: '2', name: 'Сидорук Марія Василівна' },
  { id: '3', name: 'Мельник Ольга Ігорівна' },
  { id: '4', name: 'Недашківська Валерія Павлівна' },
];

const doctorStatsData: Record<string, { date: string; count: number }[]> = {
  '1': [
    { date: '24.02', count: 5 },
    { date: '25.02', count: 9 },
    { date: '26.02', count: 7 },
    { date: '27.02', count: 11 },
    { date: '28.02', count: 9 },
    { date: '29.02', count: 7 },
    { date: '30.02', count: 11 },
  ],
  '2': [
    { date: '24.02', count: 3 },
    { date: '25.02', count: 2 },
    { date: '26.02', count: 6 },
    { date: '27.02', count: 8 },
    { date: '28.02', count: 9 },
    { date: '29.02', count: 7 },
    { date: '30.02', count: 11 },
  ],
  '3': [
    { date: '24.02', count: 10 },
    { date: '25.02', count: 5 },
    { date: '26.02', count: 2 },
    { date: '27.02', count: 9 },
    { date: '28.02', count: 9 },
    { date: '29.02', count: 7 },
    { date: '30.02', count: 11 },
  ],
  '4': [
    { date: '24.02', count: 2 },
    { date: '25.02', count: 3 },
    { date: '26.02', count: 5 },
    { date: '27.02', count: 7 },
    { date: '28.02', count: 9 },
    { date: '29.02', count: 7 },
    { date: '30.02', count: 11 },
  ],
};

const doctorRevenueStatsData: Record<
  string,
  { date: string; count: number }[]
> = {
  '1': [
    { date: '24.02', count: 5900 },
    { date: '25.02', count: 5444 },
    { date: '26.02', count: 7000 },
    { date: '27.02', count: 11000 },
    { date: '28.02', count: 9000 },
    { date: '29.02', count: 1000 },
    { date: '30.02', count: 11550 },
  ],
  '2': [
    { date: '24.02', count: 3423 },
    { date: '25.02', count: 2645 },
    { date: '26.02', count: 6422 },
    { date: '27.02', count: 8000 },
    { date: '28.02', count: 9000 },
    { date: '29.02', count: 1000 },
    { date: '30.02', count: 11550 },
  ],
  '3': [
    { date: '24.02', count: 10000 },
    { date: '25.02', count: 5000 },
    { date: '26.02', count: 2000 },
    { date: '27.02', count: 9000 },
    { date: '28.02', count: 9000 },
    { date: '29.02', count: 1000 },
    { date: '30.02', count: 11550 },
  ],
  '4': [
    { date: '24.02', count: 2655 },
    { date: '25.02', count: 3999 },
    { date: '26.02', count: 5000 },
    { date: '27.02', count: 12300 },
    { date: '28.02', count: 9000 },
    { date: '29.02', count: 1000 },
    { date: '30.02', count: 11550 },
  ],
};

function useResizeObserver(): [React.RefObject<HTMLDivElement | null>, number] {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const observeTarget = containerRef.current;
    if (!observeTarget) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentBoxSize) {
          const newWidth = entry.contentRect.width;
          setWidth(newWidth);
        }
      }
    });
    resizeObserver.observe(observeTarget);

    return () => {
      resizeObserver.unobserve(observeTarget);
    };
  }, []);

  return [containerRef, width];
}

const DailyBarChart: React.FC = () => {
  const [containerRef, containerWidth] = useResizeObserver();
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current || containerWidth === 0) return;

    d3.select(svgRef.current).selectAll('*').remove();

    const width = containerWidth;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 50, left: 60 };

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const x = d3
      .scaleBand()
      .domain(dailyData.map((d) => d.date))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(dailyData, (d) => d.count) ?? 0])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg
      .selectAll('.bar')
      .data(dailyData)
      .enter()
      .append('rect')
      .attr('class', 'bar bar-blue')
      .attr('x', (d) => x(d.date) ?? 0)
      .attr('y', (d) => y(d.count))
      .attr('width', x.bandwidth())
      .attr('height', (d) => y(0) - y(d.count));

    svg
      .append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y).ticks(5));

    svg
      .append('text')
      .attr('class', 'axis-label')
      .attr('text-anchor', 'middle')
      .attr('x', (width - margin.left - margin.right) / 2 + margin.left)
      .attr('y', height - 2)
      .text('Дата');

    svg
      .append('text')
      .attr('class', 'axis-label')
      .attr('text-anchor', 'middle')
      .attr('transform', `rotate(-90)`)
      .attr('y', margin.left - 45)
      .attr('x', -(height - margin.top - margin.bottom) / 2 - margin.top)
      .text('Кількість оглянутих пацієнтів');
  }, [containerWidth]);

  return (
    <div ref={containerRef} className="chart-responsive-wrapper">
      <svg ref={svgRef} />
    </div>
  );
};

const HourlyLineChart: React.FC = () => {
  const [containerRef, containerWidth] = useResizeObserver();
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current || containerWidth === 0) return;

    d3.select(svgRef.current).selectAll('*').remove();

    const width = containerWidth;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 50, left: 80 };

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const x = d3
      .scalePoint()
      .domain(hourlyData.map((d) => d.hour))
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(hourlyData, (d) => d.count) ?? 0])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const line = d3
      .line<{ hour: string; count: number }>()
      .x((d) => x(d.hour) ?? 0)
      .y((d) => y(d.count));

    svg
      .append('path')
      .datum(hourlyData)
      .attr('class', 'line line-purple')
      .attr('d', line ?? '');

    svg
      .selectAll('.dot')
      .data(hourlyData)
      .enter()
      .append('circle')
      .attr('class', 'dot dot-purple')
      .attr('cx', (d) => x(d.hour) ?? 0)
      .attr('cy', (d) => y(d.count))
      .attr('r', 4);

    svg
      .append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y).ticks(5));

    svg
      .append('text')
      .attr('class', 'axis-label')
      .attr('text-anchor', 'middle')
      .attr('x', (width - margin.left - margin.right) / 2 + margin.left)
      .attr('y', height - 2)
      .text('Час');

    svg
      .append('text')
      .attr('class', 'axis-label')
      .attr('text-anchor', 'middle')
      .attr('transform', `rotate(-90)`)
      .attr('y', margin.left - 45)
      .attr('x', -(height - margin.top - margin.bottom) / 2 - margin.top)
      .text('Кількість оглянутих пацієнтів');
  }, [containerWidth]);

  return (
    <div ref={containerRef} className="chart-responsive-wrapper">
      <svg ref={svgRef} />
    </div>
  );
};

const DoctorPatientsBarChart: React.FC<{ doctorId: string }> = ({
  doctorId,
}) => {
  const [containerRef, containerWidth] = useResizeObserver();
  const svgRef = useRef<SVGSVGElement | null>(null);

  const chartData = useMemo(() => {
    return doctorStatsData[doctorId] || [];
  }, [doctorId]);

  useEffect(() => {
    if (!svgRef.current || containerWidth === 0) return;

    d3.select(svgRef.current).selectAll('*').remove();

    const width = containerWidth;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 40, left: 60 };

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const x = d3
      .scaleBand()
      .domain(chartData.map((d) => d.date))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(chartData, (d) => d.count) ?? 0])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg
      .selectAll('.bar')
      .data(chartData)
      .enter()
      .append('rect')
      .attr('class', 'bar bar-orange')
      .attr('x', (d) => x(d.date) ?? 0)
      .attr('y', (d) => y(d.count))
      .attr('width', x.bandwidth())
      .attr('height', (d) => y(0) - y(d.count));

    svg
      .append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y).ticks(5));

    svg
      .append('text')
      .attr('class', 'axis-label')
      .attr('text-anchor', 'middle')
      .attr('x', (width - margin.left - margin.right) / 2 + margin.left)
      .attr('y', height - 2)
      .text('Дата');

    svg
      .append('text')
      .attr('class', 'axis-label')
      .attr('text-anchor', 'middle')
      .attr('transform', `rotate(-90)`)
      .attr('y', margin.left - 45)
      .attr('x', -(height - margin.top - margin.bottom) / 2 - margin.top)
      .text('Кількість оглянутих пацієнтів');
  }, [doctorId, containerWidth, chartData]);

  return (
    <div ref={containerRef} className="chart-responsive-wrapper">
      <svg ref={svgRef} />
    </div>
  );
};

const DoctorRevenueBarChart: React.FC<{ doctorId: string }> = ({
  doctorId,
}) => {
  const [containerRef, containerWidth] = useResizeObserver();
  const svgRef = useRef<SVGSVGElement | null>(null);

  const chartData = useMemo(() => {
    return doctorRevenueStatsData[doctorId] || [];
  }, [doctorId]);

  useEffect(() => {
    if (!svgRef.current || containerWidth === 0) return;

    d3.select(svgRef.current).selectAll('*').remove();

    const width = containerWidth;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 50, left: 60 };

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const x = d3
      .scaleBand()
      .domain(chartData.map((d) => d.date))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(chartData, (d) => d.count) ?? 0])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg
      .selectAll('.bar')
      .data(chartData)
      .enter()
      .append('rect')
      .attr('class', 'bar bar-orange')
      .attr('x', (d) => x(d.date) ?? 0)
      .attr('y', (d) => y(d.count))
      .attr('width', x.bandwidth())
      .attr('height', (d) => y(0) - y(d.count));

    svg
      .append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y).ticks(5));

    svg
      .append('text')
      .attr('class', 'axis-label')
      .attr('text-anchor', 'middle')
      .attr('x', (width - margin.left - margin.right) / 2 + margin.left)
      .attr('y', height - 2)
      .text('Дата');

    svg
      .append('text')
      .attr('class', 'axis-label')
      .attr('text-anchor', 'middle')
      .attr('transform', `rotate(-90)`)
      .attr('y', margin.left - 45)
      .attr('x', -(height - margin.top - margin.bottom) / 2 - margin.top)
      .text('Сума, грн');
  }, [doctorId, containerWidth, chartData]);

  return (
    <div ref={containerRef} className="chart-responsive-wrapper">
      <svg ref={svgRef} />
    </div>
  );
};

const Statistics: React.FC = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext)!;
  const [doctorId, setDoctorId] = useState<string>('1');

  const handleDoctorChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setDoctorId(e.target.value);
  };

  useEffect(() => {
    assertAuth(navigate, authCtx, [UserRoles.CLINIC_HEAD]);
  }, [navigate, authCtx]);

  const selectedDoctorName = useMemo(() => {
    const doc = doctors.find((d) => d.id === doctorId);
    return doc?.name || 'Лікар';
  }, [doctorId]);

  return (
    <div className="auth-body">
      <Header />
      <div className="stat-holder">
        <h1 className="stat-page-title">Статистика</h1>

        <div className="chart-container">
          <div
            className="stat-chart-box"
            style={{ backgroundColor: '#d8d7f6', padding: '1rem' }}
          >
            <h2>Статистика оглянутих пацієнтів</h2>
            <DailyBarChart />
          </div>
          <div
            className="stat-chart-box"
            style={{ backgroundColor: '#e6ffbd', padding: '1rem' }}
          >
            <h2>Кількість оглянутих клієнтів за поточний день</h2>
            <HourlyLineChart />
          </div>
        </div>

        <div className="doctor-select-row" style={{ marginTop: '1rem' }}>
          <label htmlFor="doctor-select" className="doctor-select-label">
            Лікар:
          </label>
          <select
            id="doctor-select"
            className="doctor-select"
            onChange={handleDoctorChange}
            value={doctorId}
          >
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.name}
              </option>
            ))}
          </select>
        </div>

        <div
          className="chart-container"
          style={{
            backgroundColor: '#cce7ff',
            borderRadius: '6px',
            padding: '1rem',
            boxSizing: 'border-box',
          }}
        >
          <div className="stat-chart-box">
            <h2 style={{ textAlign: 'left' }}>
              Кількість оглянутих пацієнтів лікарем
              <br />
              {selectedDoctorName}
            </h2>
            <DoctorPatientsBarChart doctorId={doctorId} />
          </div>
          <div className="stat-chart-box">
            <h2 style={{ textAlign: 'left' }}>
              Прибуток, принесений лікарем
              <br />
              {selectedDoctorName}
            </h2>
            <DoctorRevenueBarChart doctorId={doctorId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
