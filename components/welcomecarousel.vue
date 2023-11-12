<template>
    <div class="hero min-h-screen">
        <div class="hero-content flex-col w-fit">
            <div class="prose">
                <h1>Gallery</h1>
            </div>
            <div class="carousel lg:carousel-center rounded-box">
                <div class="carousel-item">
                    <LazyNuxtPicture width="400" height="400" format="webp" src="/dinoIMG_4070.jpg" quality="70" />
                </div>
                <div class="carousel-item">
                    <LazyNuxtPicture width="400" height="400" format="webp" src="/threebees.jpg" quality="70" />
                </div>
                <div class="carousel-item">
                    <LazyNuxtPicture width="400" height="400" format="webp" src="/kirboIMG_4059.jpg" quality="70" />
                </div>
            </div>
        </div>
    </div>
</template>
