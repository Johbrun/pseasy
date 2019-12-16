import * as React from 'react'
import { Link, graphql } from 'gatsby'

import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'

interface INode {
  node: ISheet
}
interface ISheet {
  title: string
  reference: string
}
const PageTwo = ({ data }: { data: any }) => {
  const summary: INode[] = data.allMysqlGetSheets.edges
  console.log(summary)
  return (
    <IndexLayout>
      <Page>
        <Container>
          <h1>Hi from the second page</h1>
          <ul>
            {summary.map(({ node }) => (
              <li>{node.title}</li>
            ))}
          </ul>
          <ul>
            <li>
              <Link to="/a-markdown-page/">Show me some Markdown!</Link>
            </li>
            <li>
              <Link to="/">Take me back home.</Link>
            </li>
          </ul>
        </Container>
      </Page>
    </IndexLayout>
  )
}

export const query = graphql`
  query {
    allMysqlGetSheets {
      edges {
        node {
          id
          title
          reference
        }
      }
    }
  }
`
export default PageTwo
