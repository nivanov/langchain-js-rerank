import {CohereRerank} from "@langchain/cohere";
import {Document} from "@langchain/core/documents";

//
// Test dataset of the documents.
// Replace it with the result set from RAG pipeline.
//
const ragResSet = [
    new Document({
        metadata: {},
        id: "1",
        pageContent:
            "Carson City is the capital city of the American state of Nevada. At the 2010 United States Census, " +
            "Carson City had a population of 55,274.",
    }),
    new Document({
        metadata: {},
        id: "2",
        pageContent:
            "The Commonwealth of the Northern Mariana Islands is a group of islands in the Pacific Ocean that are a " +
            "political division controlled by the United States. Its capital is Saipan.",
    }),
    new Document({
        metadata: {},
        id: "3",
        pageContent:
            "Charlotte Amalie is the capital and largest city of the United States Virgin Islands. It has about " +
            "20,000 people. The city is on the island of Saint Thomas.",
    }),
    new Document({
        metadata: {},
        id: "4",
        pageContent:
            "Washington, D.C. (also known as simply Washington or D.C., and officially as the District of Columbia) is " +
            "the capital of the United States. It is a federal district. The President of the USA and many major national " +
            "government offices are in the territory. This makes it the political center of the United States of America.",
    }),
    new Document({
        metadata: {},
        id: "5",
        pageContent:
            "Capital punishment (the death penalty) has existed in the United States since before the United States was a " +
            "country. As of 2017, capital punishment is legal in 30 of the 50 states. The federal government (including the " +
            "United States military) also uses capital punishment.",
    }),
];

//
// Test user query.
// Replace it with the actual user query from chqtbot.
//
const usrQry = "What is the capital of the United States?";

//
// Make sure to add COHERE_API_KEY as env variable (in Shell or in IDE Run Configuration).
//
const reranker = new CohereRerank({
    apiKey: process.env.COHERE_API_KEY,
    model: "rerank-english-v2.0", // Reranking model name.
    topN: 5, // Get ONLY the top 5 results.
});

//
// Use re-ranking model to re-rank the RAG result set based on the user query.
//

// Return indexes of the original RAG result set.
const rerankedDocs = await reranker.rerank(ragResSet, usrQry);

// Return actual documents from the original RAG result set.
//const rerankedDocs = await reranker.compressDocuments(ragResSet, usrQry);

// Gets indexes of the documents.
console.log(rerankedDocs);
