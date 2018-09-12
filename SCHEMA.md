### Calendar

```
{date: dayObj}
```

#### date

```
"2017-04-23"
```

#### dayObj

```
{
	"twitter": [Int],
	"gdelt": [Int],
	"reddit": [Int],
	"anomalies": {anomalyId: anomalyObj}
}
```

#### anomalyObj

```
{
	"node": nodeId, 
	"anomaly_type": String, 
	"keyword": String, 
	"hour": Int, 
	"variation": Float, 
	"source": String, 
	"depth": Float, 
	"anomaly_level": Int, 
	"date": date
}
```


### Anomalous Context

```
{
	nodes: {nodeId: nodeObj},
	intervals: [intervalObj],
	dendrogram: {depth: depthObj},
	topic_distances: [[Float]]
}
```

#### nodeObj

```
{
	temporal_keywords: [[keywodObj]]
	topic_documents: [documentObj]
	stream_vector: [Float]
	anomalies: anomaliesObj
	keywords: [keywodObj]
	children: [nodeId]
}
```

#### keywordObj

```
[
	String,
	Float
]
```

#### documentObj

```
[
	String,
	Float
]
```

#### anomaliesObj

```
{
	volume_decrease: {intervalIndex: Float},
	volume_increase: {intervalIndex: Float}
}
```

#### intervalObj

```
[
	Date,
	Date
]
```

#### Date

```
"2017-04-23T00"
```

#### depthObj

```
{
	nodes: [nodeId],
	"anomalies": {
		"volume_increase": Float, 
		"volume_decrease": Float
	}
}
```