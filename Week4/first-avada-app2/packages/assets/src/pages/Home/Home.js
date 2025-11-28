import React from 'react'
import { Banner, BlockStack, Button, Card, InlineStack, Layout, Page, Text } from '@shopify/polaris'
import generateShopifyEditorDeepLink from '@assets/helpers/generateShopifyEditorDeepLink'
import { useAppBridge } from '@shopify/app-bridge-react'
import useFetchApi from '@assets/hooks/api/useFetchApi'
import LoadingSkeletonPage from '@assets/components/LoadingSkeletonPage/LoadingSkeletonPage'

export default function Home () {
  const shopify = useAppBridge()
  const activeExtensionLink = generateShopifyEditorDeepLink({ shopDomain: shopify.config.shop })
  const { data, setData, loading } = useFetchApi({
    url: '/extension/is-disabled',
    defaultData: { isDisabled: false }
  })
  const isDisabled = data.isDisabled
  const handleEnabled = () => setData({ isDisabled: true })
  if (loading) return <LoadingSkeletonPage></LoadingSkeletonPage>
  return (
    <Page title="Home">
      <Layout>
        <Layout.Section>
          <BlockStack gap="400">
            <Card>
              <InlineStack blockAlign="center">
                <Text as="span">Your app <strong>
                  {!isDisabled ? 'Enabled' : 'Disabled'}
                </strong> </Text>
                <div style={{ flex: 1 }}/>
                {isDisabled &&
                  <Button
                    variant={'primary'}
                    onClick={() => window.open(activeExtensionLink, '_blank')}
                  >
                    Enable
                  </Button>
                }

              </InlineStack>
            </Card>
            {isDisabled &&
              <Banner
                tone="warning"
                title="This app is not activated yet"
                action={{ content: 'Activate', onAction: () => window.open(activeExtensionLink, '_blank') }}
                secondaryAction={{ content: 'I have done it', onAction: handleEnabled }}
                onDismiss={handleEnabled}
              >
                Please activate the app by clicking 'Activate' button and then 'Save' in the following page.
              </Banner>
            }

          </BlockStack>
        </Layout.Section>
      </Layout>
    </Page>
  )
}
