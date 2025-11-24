import {
  BlockStack,
  Card,
  InlineGrid,
  LegacyCard,
  SkeletonBodyText,
  SkeletonDisplayText,
  SkeletonPage,
  TextContainer,
} from '@shopify/polaris'
import React from 'react'

export function CustomeSkeletonPage () {
  return (
    <SkeletonPage primaryAction>
      <BlockStack gap={'400'}>


        <Card sectioned>
          <SkeletonBodyText/>
        </Card>
        <LegacyCard sectioned>
          <TextContainer>
            <SkeletonDisplayText size="small"/>
            <SkeletonBodyText/>
          </TextContainer>
        </LegacyCard>

        <InlineGrid columns={4} gap={'400'}>

          <Card sectioned>
            <TextContainer>
              <SkeletonDisplayText size="small"/>
              <SkeletonBodyText/>
            </TextContainer>
          </Card>
          <Card sectioned>
            <TextContainer>
              <SkeletonDisplayText size="small"/>
              <SkeletonBodyText/>
            </TextContainer>
          </Card>
          <Card sectioned>
            <TextContainer>
              <SkeletonDisplayText size="small"/>
              <SkeletonBodyText/>
            </TextContainer>
          </Card>
          <Card sectioned>
            <TextContainer>
              <SkeletonDisplayText size="small"/>
              <SkeletonBodyText/>
            </TextContainer>
          </Card>
        </InlineGrid>

      </BlockStack>


    </SkeletonPage>
  )
}
