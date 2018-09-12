import 'd3-transition';
import {select} from 'd3-selection';
import {max} from 'd3-array';
import {
	stratify,
	pack as packFactory
} from 'd3-hierarchy';
import {scaleSqrt} from 'd3-scale';
import {
	CLUSTERS_VOLUME_CUTOFF,
	nodeColor,
	anomalyColor
} from '../parameters';
import {brighten1} from '../utils';
import {
	FORCE_STRENGTH,
	forceManyBody,
	forceCollide,
	forceX,
	forceY,
	forceCenter,
	force
} from './force';

const VERTEX_PADDING = 1;
const pack = packFactory();

const scaleRadius = scaleSqrt()
	.range([5, 25])
	.clamp(true);

const oldVertex = (vertex, vertices) =>
	vertices
		.find(el =>
			el.keyword === vertex.keyword &&
			el.nodeId === vertex.nodeId
		) || {};

const updateVertices = (data, vertices) =>
	data.map(vertex => Object.assign({}, oldVertex(vertex, vertices), vertex));

const hasCharge = d => d.rootId === d.id;
const vertexName = d => hasCharge(d) ? d.keyword : '';
const color = (d, selectedAnomaly) =>
	selectedAnomaly ?
		anomalyColor[d.nodeAnomaly] :
		nodeColor(d.nodeId.slice(1));

export default selector => {
	let clickOnNodeHandler;
	let data = [];
	let selectedAnomaly;
	let oldVertices = [];
	let _data;
	let _selectedAnomaly;
	let width;
	let height;

	const $ = () => {
		if (
			data === _data &&
			selectedAnomaly === _selectedAnomaly
		) {
			return;
		}
		_data = data;
		_selectedAnomaly = selectedAnomaly;

		let vertices = updateVertices(data, oldVertices);

		scaleRadius
			.domain([CLUSTERS_VOLUME_CUTOFF, max(vertices.map(el => el.volume))]);

		pack
			.size([width, height])
			.padding(VERTEX_PADDING)
			.radius(d => scaleRadius(d.data.volume));

		if (vertices.length !== 0) {
			const branches = [{id: '__root', nodeId: '', volume: 0}]
				.concat(vertices
					.map(el => el.nodeId)
					.reduce((p, c) => {
						if (p.indexOf(c) < 0) {
							p = p.concat(c);
						}
						return p;
					}, [])
					.map(el => ({id: el, nodeId: '__root', volume: 0}))
				);
			const root = stratify()
				.id(d => d.id)
				.parentId(d => d.nodeId)(vertices.concat(branches));
			pack(root.sum(d => d.volume));
			vertices = root
				.leaves()
				.map(el => Object.assign({}, {x: el.x, y: el.y}, el.data));
		}
		oldVertices = vertices;

		const GRAVITY_CENTER = {
			x: width / 2,
			y: height / 2
		};
		forceCollide
			.radius(d => scaleRadius(d.volume) + VERTEX_PADDING);
		forceX
			.x(GRAVITY_CENTER.x);
		forceY
			.y(GRAVITY_CENTER.y);
		forceCenter
			.x(GRAVITY_CENTER.x)
			.y(GRAVITY_CENTER.y);
		forceManyBody
			.strength(d =>
				hasCharge(d) ?
					FORCE_STRENGTH :
					0
				);

		const selection = select(selector);
		const foregroundVerticesGroup =
			selection
				.select('g.foreground-vertices');
		const backgroundVerticesGroup =
			selection
				.select('g.background-vertices');
		const vertexLabelsGroup =
			selection
				.select('g.vertex-labels');
		const foregroundVertices =
			foregroundVerticesGroup
				.selectAll('.vertex')
				.data(vertices, d => d.id);
		const backgroundVertices =
			backgroundVerticesGroup
				.selectAll('.vertex')
				.data(vertices, d => d.id);
		const vertexLabels =
			vertexLabelsGroup
				.selectAll('.vertex')
				.data(vertices, d => d.id);

		//add tooltips
		//first, remove the existing ones
		select('.tooltips-container').selectAll(".tooltip-cluster").remove()

		const tooltipDiv = select('.tooltips-container')
				.append("div")
				.attr("class", "tooltip-cluster")
				.style("opacity", 0);

		const draw = (selection, k, modifyColor) => {
			selection
				.exit()
				.transition()
					.duration(750)
					.remove();

			selection
				.exit()
				.select('circle')
				.transition()
					.duration(750)
					.attr('r', 0);

			selection
					.attr('transform', d => `translate(${d.x}, ${d.y})`)
					.on('click', clickOnNodeHandler);

			selection
				.select('circle')
				.transition()
					.duration(1500)
					.attr('r', d => k + scaleRadius(d.volume))
					.style('fill', d => modifyColor(color(d, selectedAnomaly)));

			const selectionEnter = selection
				.enter()
				.append('g')
					.attr('class', 'vertex')
					.attr('transform', d => `translate(${d.x}, ${d.y})`)
					.on('click', clickOnNodeHandler)
					.on("mouseover", function(d) {
						tooltipDiv.transition()
							.duration(200)
							.style("opacity", 1);
						tooltipDiv.html(d.keyword)
							.style("left", d.x + 10 + "px") //FIX: remove hardcoded values
							.style("top", d.y + 10 + "px")  //FIX: remove hardcoded values
							//.style("position","absolute")
							//.style("border","1px solid")
						})
					.on("mouseout", function(d) {
						tooltipDiv.transition()
							.duration(500)
							.style("opacity", 0);
						});

			selectionEnter
				.append('circle')
					.attr('r', 0)
					.style('fill', d => modifyColor(color(d, selectedAnomaly)))
				.transition()
					.duration(1500)
					.attr('r', d => k + scaleRadius(d.volume));
		};

		const drawLabels = selection => {
			selection
				.exit()
				.transition()
					.duration(750)
					.remove();

			selection
				.exit()
				.select('text')
				.transition()
					.duration(750)
					.style('opacity', 0);

			selection
					.attr('transform', d => `translate(${d.x}, ${d.y})`);

			selection
				.select('text')
					.text(vertexName);

			const selectionEnter = selection
				.enter()
				.append('g')
					.attr('class', 'vertex')
					.attr('transform', d => `translate(${d.x}, ${d.y})`);

			selectionEnter
				.append('text')
					.text(vertexName)
					.attr('dy', 4)
					.style('opacity', 0)
				.transition()
					.duration(1500)
					.style('opacity', 1);
		};

		foregroundVertices.call(draw, 0, el => el);
		backgroundVertices.call(draw, 10, brighten1);
		vertexLabels.call(drawLabels);

		force
			.nodes(vertices)
			.on('tick', () => {
				vertices.forEach(vertex => {
					const a = force.alpha();
					if (!hasCharge(vertex)) {
						const root = vertices.find(el => el.id === vertex.rootId);
						const x = vertex.x - root.x;
						const y = vertex.y - root.y;
						let l = Math.sqrt(x * x + y * y);
						const r = (scaleRadius(vertex.volume) + scaleRadius(root.volume))/4;
						if (l !== r) {
							l = (l - r) / l * a;
							vertex.x -= (x * l);
							vertex.y -= (y * l);
						}
					}
				});
				foregroundVerticesGroup
					.selectAll('.vertex')
						.attr('transform', d => `translate(${d.x}, ${d.y})`);
				backgroundVerticesGroup
					.selectAll('.vertex')
						.attr('transform', d => `translate(${d.x}, ${d.y})`);
				vertexLabelsGroup
					.selectAll('.vertex')
						.attr('transform', d => `translate(${d.x}, ${d.y})`);
			})
			.restart()
			.alpha(1);
	};

	$.data = _ => {
		data = _;
		return $;
	};

	$.selectedAnomaly = _ => {
		selectedAnomaly = _;
		return $;
	};

	$.width = _ => {
		width = _;
		return $;
	};

	$.height = _ => {
		height = _;
		return $;
	};

	$.clickOnNodeHandler = _ => {
		clickOnNodeHandler = _;
		return $;
	};

	return $;
};
