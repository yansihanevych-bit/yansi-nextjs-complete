#!/bin/bash

# Создаем все директории
mkdir -p services/{performance-advertising,google-ads,meta-ads,bing-ads,tiktok-ads,youtube-ads,x-ads,content-marketing,email-marketing,seo,ai-development,web-development,blockchain-development,custom-ai-agents,google-shopping}
mkdir -p solutions/{saas,fintech,healthtech,ecommerce,travel-education}
mkdir -p platforms/{shopify,wordpress,magento,opencart,nft-marketplace}
mkdir -p industries/{specialized,supply-chain}
mkdir -p ai-agents/osint
mkdir -p tools/{calculator,utm-generator}
mkdir -p guides/{choose-marketing,google-ads-generator}
mkdir -p blog
mkdir -p cases
mkdir -p policies

echo "✅ Все директории созданы!"

# Подсчитываем количество директорий
find . -type d -name "page.tsx" -o -type d | grep -v "^\." | wc -l

