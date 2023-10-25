<template>
    <header>
        <nav>
            <navbar />
        </nav>
    </header>

    <div>
        <NuxtLayout>
            <NuxtLoadingIndicator />
            <NuxtPage />
        </NuxtLayout>
    </div>

    <div>
        <footercomponent />
    </div>
</template>
