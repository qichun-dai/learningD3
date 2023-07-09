async function drawForce() {
    // read data
    const dataset = await d3.json("./data/harry_potter.json")
    console.log(dataset)

    const nodes = dataset.nodes
    const links = dataset.links

    console.log(dataset.nodes)
    console.log(dataset.links)

    const width = 900
    const height = 600

    const svg = d3.select("#chart-area")
        .attr("width", width)
        .attr("height", height)


    const force = d3.forceSimulation()
        .nodes(dataset.nodes)
        .force("link", d3.forceLink().id(d => d.id).links(dataset.links))
        .force("charge", d3.forceManyBody().strength(function(d) { return -d.group*40; }))
        //added strength
        .force("center", d3.forceCenter(width / 2, height / 2))

    const link = svg.selectAll(".link")
        .data(dataset.links)
        .enter().append("line")
        .attr("class", "link")

    const node = svg.selectAll(".node")
        .data(dataset.nodes)
        .enter().append("circle")
        .attr("class",d => d.team)
        .attr("id", d => `node_${d.id}`)
        .attr("r", d => (4-d.group)*7.5)
        // add mouse event
        .on('mouseover', (event,d) => mouseOver(event,d))
        .on('mouseout', (event,d) => mouseOut(event,d))
        .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended))

    function mouseOver(event,d) { 
        // to see what are the first and second argument
        console.log(event, d, this)

        d3.select(`#node_${d.id}`)
            .attr("r", 30)
        console.log(node.select(`#node_${d.id}`))
    }

    function mouseOut(event,d) { 
    console.log(event,d)

    d3.select(`#node_${d.id}`)
        .attr("r", i => (4-i.group)*7.5)
    }

    node.append("title")
        .text(d => d.first_name +" "+d.last_name )

    force.on("tick", function() {
        link.attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y)

        node.attr("cx", d => d.x)
            .attr("cy", d => d.y)
    });


    function dragstarted(event, d) {
        if (!event.active) force.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragended(event, d) {
        if (!event.active) force.alphaTarget(0);
        d.fx = null;
        d.fy = null;

    }
}
    
    drawForce()