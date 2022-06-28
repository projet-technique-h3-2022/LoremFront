<template>
    <div class="ReadArticle">
        <div class="articleImage">
            <img src="https://picsum.photos/1200/200" class="img-fluid" alt="..." />
            <h1 class="articleTitle">Article Title</h1>
        </div>
        <div class="articleContent">
            <div class="row">
                <div class="col-md-2 leftContent">
                    <div>Publié le 1900</div>
                    <div>Ecrit par John Doe</div>
                    <div>Lien vers le groupe</div>
                </div>
                <div class="col-md-8 mainContent">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea at, molestias explicabo aperiam,
                    eveniet iure dignissimos ut omnis in enim repellendus porro voluptatem ex inventore recusandae!
                    Nesciunt vel quos libero.
                    Laudantium reprehenderit amet porro, commodi recusandae aliquid repellat, necessitatibus ad
                    dolore saepe perferendis nam nostrum, officia ratione? Aspernatur distinctio ab obcaecati
                    molestiae saepe numquam alias ut eveniet, doloremque facilis enim.
                    Odit possimus placeat magni, dolores inventore ipsum illo, pariatur tempore debitis, tempora at
                    libero obcaecati laborum. Amet soluta labore odit iure suscipit, consequatur saepe eos ducimus
                    dolor facere vel aut.
                    Eius illum suscipit dolor veniam nemo minima commodi, ipsum, optio sapiente quo, vel iste nam
                    laboriosam. Dolore consectetur facilis dolor ullam autem, eum id exercitationem obcaecati saepe
                    deleniti possimus a?
                    Consequatur excepturi eius at. Unde voluptatem commodi deleniti ipsum autem laudantium, nostrum
                    error doloribus eaque, accusantium necessitatibus ex. Facere nesciunt numquam eum veritatis
                    repellendus. Neque illum suscipit quae eos repellat.
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.articleImage {
    position: relative;
    display: flex;
    justify-content: center;
}

img {
    max-height: 200px;
    width: 100%;
    object-fit: cover;
    /* filter: contrast(-100%); */
    /* backdrop-filter: blur(100px); */
}

.articleTitle {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    text-shadow: 0px 0px 10px black;
}

.articleContent {
    margin-top: 1rem;
}

.leftContent {
    display: flex;
    flex-flow: column nowrap;
    gap: 1rem;
}
</style>