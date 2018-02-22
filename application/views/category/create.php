<!doctype html>
<html class="fixed sidebar-light">
<head>
    <?php $this->load->view('layouts/head') ?>
</head>
<body>

<section class="body">
    <?php $this->load->view('layouts/header') ?>
    <div class="inner-wrapper">
        <?php $this->load->view('layouts/sidebar') ?>
        <section role="main" class="content-body">
            <header class="page-header">
                <h2>Category</h2>
            </header>

            <!-- start: page -->
            <div class="row">
                <div class="col">
                    <form class="form-horizontal form-bordered" action="<?php echo base_url("category/create") ?>" method="post">
                        <section class="card">
                            <header class="card-header">
                                <div class="card-actions">
                                </div>

                                <h2 class="card-title">Create new category</h2>
                            </header>
                            <div class="card-body">
                                <div class="form-group row">
                                    <label class="col-lg-3 control-label text-lg-right pt-2" for="name_th">Category Name TH</label>
                                    <div class="col-lg-6">
                                        <input type="text" class="form-control" name="name_th" id="name_th" aria-describedby="helpId" placeholder="">
                                        <small id="helpId" class="form-text text-muted"></small>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 control-label text-lg-right pt-2" for="name_en">Category Name EN</label>
                                    <div class="col-lg-6">
                                        <input type="text" class="form-control" name="name_en" id="name_en" aria-describedby="helpId" placeholder="">
                                        <small id="helpId" class="form-text text-muted"></small>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 control-label text-lg-right pt-2" for="url_slug">Slug URL</label>
                                    <div class="col-lg-6">
                                        <input type="text" class="form-control" name="url_slug" id="url_slug" aria-describedby="helpId" placeholder="">
                                        <small id="helpId" class="form-text text-muted"></small>
                                    </div>
                                </div>
                            </div>
                            <footer class="card-footer text-right">
                                <button class="btn btn-primary">Create</button>
                            </footer>
                        </section>
                    </form>
                </div>
            </div>
            <!-- end: page -->
        </section>
    </div>
</section>

<?php $this->load->view('layouts/footer') ?>

</body>
</html>