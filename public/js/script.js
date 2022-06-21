$(document).ready(function() {
    changeNFTImage();
})

function changeNFTImage() {
    var counter = 1;
    setInterval(() => {
        if(counter > 9) {
            counter = 1
        }
        // console.log(counter)
        $('#nftimage').attr('src','images/nfts/'+counter+'.png')
        counter++
    }, 1000);
}