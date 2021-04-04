const openItem = (item) => {
    const container = item.closest(".member");
    const contentBlock = container.find(".member__content");
    const contentText = container.find(".member__content-block");
    const reqHeight = contentText.height();

    container.addClass("member_active");
    contentBlock.height(reqHeight);

};

const closeEvery = (container) => {
    const items = container.find(".member__content");
    const parents = container.find(".member");

    parents.removeClass('member_active');
    items.height(0);
};

$(".member__name").on("click", (e) => {
    const _this = $(e.currentTarget);
    const parent = _this.closest(".member");
    const container = _this.closest(".team");

    if(parent.hasClass("member_active")) {
        closeEvery(container);
    } else {
        closeEvery(container);
        openItem(_this);
    }
});

