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
import api from '../service/axiosUtils';

interface WeeklyStatsDto {
  entries: WeeklyStatsEntryDto[];
}
interface WeeklyStatsEntryDto {
  date: string;
  count: number;
}

interface DailyCumulateDto {
  entries: DailyCumulateEntryDto[];
}
interface DailyCumulateEntryDto {
  hour: string;
  count: number;
}

interface DoctorRegistryDto {
  entries: DoctorEntryDto[];
}
interface DoctorEntryDto {
  id: number;
  name: string;
}

interface DoctorDailyCountsDto {
  entries: DoctorDailyCountDto[];
}
interface DoctorDailyCountDto {
  date: string;
  count: number;
}

interface DoctorDailyRevenuesDto {
  entries: DoctorDailyRevenueDto[];
}
interface DoctorDailyRevenueDto {
  date: string;
  count: number;
}

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

interface DailyBarChartProps {
  data: WeeklyStatsEntryDto[];
}
const DailyBarChart: React.FC<DailyBarChartProps> = ({ data }) => {
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
      .domain(data.map((d) => d.date))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.count) ?? 0])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg
      .selectAll('.bar')
      .data(data)
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
  }, [data, containerWidth]);

  return (
    <div ref={containerRef} className="chart-responsive-wrapper">
      <svg ref={svgRef} />
    </div>
  );
};

interface HourlyLineChartProps {
  data: DailyCumulateEntryDto[];
}
const HourlyLineChart: React.FC<HourlyLineChartProps> = ({ data }) => {
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
      .domain(data.map((d) => d.hour))
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.count) ?? 0])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const line = d3
      .line<DailyCumulateEntryDto>()
      .x((d) => x(d.hour) ?? 0)
      .y((d) => y(d.count));

    svg
      .append('path')
      .datum(data)
      .attr('class', 'line line-purple')
      .attr('d', line ?? '');

    svg
      .selectAll('.dot')
      .data(data)
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
  }, [data, containerWidth]);

  return (
    <div ref={containerRef} className="chart-responsive-wrapper">
      <svg ref={svgRef} />
    </div>
  );
};

interface DoctorPatientsBarChartProps {
  data: DoctorDailyCountDto[];
}
const DoctorPatientsBarChart: React.FC<DoctorPatientsBarChartProps> = ({
  data,
}) => {
  const [containerRef, containerWidth] = useResizeObserver();
  const svgRef = useRef<SVGSVGElement | null>(null);

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
      .domain(data.map((d) => d.date))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.count) ?? 0])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg
      .selectAll('.bar')
      .data(data)
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
  }, [data, containerWidth]);

  return (
    <div ref={containerRef} className="chart-responsive-wrapper">
      <svg ref={svgRef} />
    </div>
  );
};

interface DoctorRevenueBarChartProps {
  data: DoctorDailyRevenueDto[];
}
const DoctorRevenueBarChart: React.FC<DoctorRevenueBarChartProps> = ({
  data,
}) => {
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
      .domain(data.map((d) => d.date))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.count) ?? 0])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg
      .selectAll('.bar')
      .data(data)
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
  }, [data, containerWidth]);

  return (
    <div ref={containerRef} className="chart-responsive-wrapper">
      <svg ref={svgRef} />
    </div>
  );
};

const Statistics: React.FC = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext)!;

  const [weeklyStats, setWeeklyStats] = useState<WeeklyStatsEntryDto[]>([]);
  const [todayCumulate, setTodayCumulate] = useState<DailyCumulateEntryDto[]>(
    [],
  );
  const [doctors, setDoctors] = useState<DoctorEntryDto[]>([]);
  const [doctorId, setDoctorId] = useState<string>('');
  const [doctorCounts, setDoctorCounts] = useState<DoctorDailyCountDto[]>([]);
  const [doctorRevenues, setDoctorRevenues] = useState<DoctorDailyRevenueDto[]>(
    [],
  );

  const handleDoctorChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setDoctorId(e.target.value);
  };

  useEffect(() => {
    assertAuth(navigate, authCtx, [UserRoles.CLINIC_HEAD]);
    fetchWeeklyStats();
    fetchTodayCumulate();
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (doctorId) {
      fetchDoctorCounts(doctorId);
      fetchDoctorRevenues(doctorId);
    }
  }, [doctorId]);

  const fetchWeeklyStats = async () => {
    try {
      const response = await api.get<WeeklyStatsDto>('/owner/stats/week');
      setWeeklyStats(response.entries);
    } catch (error) {
      console.error('Error fetching weekly stats:', error);
    }
  };

  const fetchTodayCumulate = async () => {
    try {
      const response = await api.get<DailyCumulateDto>('/owner/stats/cumulate');
      setTodayCumulate(response.entries);
    } catch (error) {
      console.error('Error fetching today cumulate:', error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await api.get<DoctorRegistryDto>('/public/doctors');
      setDoctors(response.entries);
      if (response.entries.length > 0) {
        setDoctorId(response.entries[0].id.toString());
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const fetchDoctorCounts = async (docId: string) => {
    try {
      const response = await api.get<DoctorDailyCountsDto>(
        `/owner/stats/doctor/counts?doctorId=${docId}`,
      );
      setDoctorCounts(response.entries);
    } catch (error) {
      console.error('Error fetching doctor counts:', error);
    }
  };

  const fetchDoctorRevenues = async (docId: string) => {
    try {
      const response = await api.get<DoctorDailyRevenuesDto>(
        `/owner/stats/doctor/revenue?doctorId=${docId}`,
      );
      setDoctorRevenues(response.entries);
    } catch (error) {
      console.error('Error fetching doctor revenues:', error);
    }
  };

  const selectedDoctorName = useMemo(() => {
    const doc = doctors.find((d) => d.id.toString() === doctorId);
    return doc?.name || 'Лікар';
  }, [doctorId, doctors]);

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
            <h2>Статистика оглянутих пацієнтів (за тиждень)</h2>
            <DailyBarChart data={weeklyStats} />
          </div>
          <div
            className="stat-chart-box"
            style={{ backgroundColor: '#e6ffbd', padding: '1rem' }}
          >
            <h2>Кількість оглянутих клієнтів за поточний день (накопичено)</h2>
            <HourlyLineChart data={todayCumulate} />
          </div>
        </div>

        {/* 2) Doctor selection */}
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

        {/* 3) Doctor-specific charts */}
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
            <DoctorPatientsBarChart data={doctorCounts} />
          </div>
          <div className="stat-chart-box">
            <h2 style={{ textAlign: 'left' }}>
              Прибуток, принесений лікарем
              <br />
              {selectedDoctorName}
            </h2>
            <DoctorRevenueBarChart data={doctorRevenues} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
