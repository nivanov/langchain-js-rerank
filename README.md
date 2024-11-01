# Re-Ranking LangchainJS Example  
Quick example based on the [LangchainJS example](https://js.langchain.com/docs/integrations/document_compressors/cohere_rerank/) of re-ranking using [Cohere](https://docs.cohere.com/docs/rate-limits) reranking model.

Files:
 - `rerank.js` - Simple runnable example of using [Cohere](https://docs.cohere.com/docs/rate-limits) reranking model.
 - `rerank_pipeline.js` - A wireframe (not working) example of RAG pipeline with [Cohere](https://docs.cohere.com/docs/rate-limits) reranking.

## Prerequisites 
 - Install [NodeJS](https://nodejs.org/en/download/package-manager)
 - Get Cohere eval or prod API key at https://docs.cohere.com/docs/rate-limits

## Installation
```shell
$ git clone https://github.com/nivanov/langchain-js-rerank.git
$ cd langchain-js-rerank
$ npm install
$ export COHERE_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Run
```shell
$ node rerank.js
```
