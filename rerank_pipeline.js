import {CohereRerank} from "@langchain/cohere"
import {ScoreThresholdRetriever} from 'langchain/retrievers/score_threshold'
import {ChatPromptTemplate} from "@langchain/core/prompts"
import {StringOutputParser} from "@langchain/core/output_parsers"
import {ChatOpenAI} from "@langchain/openai"
import {RunnablePassthrough, RunnableSequence} from "@langchain/core/runnables"

//
// Make sure to add COHERE_API_KEY as env variable (in Shell or in IDE Run Configuration).
//
const reranker = new CohereRerank({
    apiKey: process.env.COHERE_API_KEY,
    model: "rerank-english-v2.0", // Reranking model name.
    topN: 5, // Get ONLY the top 5 results.
})

const usrQry = "" // Replace it with the actual follow-up or the latest user query.

//
// A wireframe of creating RAG pipeline with summary condenser, retriever and re-ranker.
//
function createRerankPipeline() {
    try {
        const prompt = ChatPromptTemplate.fromMessages([['system', "Condenser system prompt..."]])
        const llm = new ChatOpenAI({model: "gpt-4"}) // Change the model as required.

        const condenserChain =
            prompt
                .pipe(llm)
                .pipe(new StringOutputParser())
                .withConfig({ runName: 'condenser_chain'})

        return RunnableSequence.from([
            //
            // Condenser part.
            //
            RunnablePassthrough.assign({
                condensed: (input) => {
                    return condenserChain.invoke({
                        ...input
                    });
                }
            }),

            //
            // Retriever part.
            //
            RunnablePassthrough.assign({
                data: async (input) => {
                    const retriever = ScoreThresholdRetriever.fromVectorStore(this.vectorStore, {
                        minSimilarityScore: 0.5,
                        maxK: 100,
                        verbose: true
                    });
                    return await retriever.getRelevantDocuments(input.condensed);
                }
            }),

            //
            // Re-reranking part.
            //
            RunnablePassthrough.assign({
                // 'reranked' will contain the top 5 (see 'topN') documents re-reranked by their relevance to the 'usrQry'.
                reranked: async (input) => {
                    return await reranker.compressDocuments(input.data, usrQry);
                }
            })
        ])
    }
    catch (e) {
        console.error(`Failed to create RAG re-ranking pipeline due to: ${e}`)
    }
}